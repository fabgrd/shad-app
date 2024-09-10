import { Request, RequestHandler } from 'express';
import Joi from 'joi';
import requestMiddleware from '../../middleware/request-middleware';
import { authMiddleware } from '../../middleware/auth-middleware';
import User from '../../models/User';
import Routine from '../../models/Routine';
import RoutineTasks from '../../models/RoutineTasks';

export const createSchema = Joi.object().keys({
    deadline: Joi.date().required(),
    completed: Joi.boolean().required(),
    cheatDay: Joi.boolean().required(),
    tasks: Joi.array().items(Joi.object({
        title: Joi.string().required(),
        score: Joi.number().required(),
        completed: Joi.boolean().required()
    })).required()
    
});

interface createReqBody {
    deadline: Date;
    completed: boolean;
    finishedAt: Date;
    cheatDay: boolean;
    tasks: {
        title: string;
        score: number;
        completed: boolean;
    }[];
}

const create: RequestHandler = async (req: Request<{}, {}, createReqBody>, res) => {
    const { deadline, completed, cheatDay, tasks } = req.body;

    const user = await User.findOne({ _id: req?.user?._id });

    if (!user) {
        return res.status(400).send({
            error: 'User not found'
        });
    }

    if (user.routine) {
        await Routine.deleteOne({ _id: user.routine });
        await RoutineTasks.deleteMany({ user: user._id });
    }

    const createTasksAsync = async () => {
        return Promise.all(tasks.map(async (task) => {
            const routineTask = new RoutineTasks({
                title: task.title,
                score: task.score,
                completed: task.completed,
                user: user._id
            });

            const savedRoutineTask = await routineTask.save();

            return savedRoutineTask;
        }));
    }

    await createTasksAsync();
    
    const allRoutineTasks = await RoutineTasks.find({ user: user._id });


    const selectAllTasksIdsAsync = async () => {
        return allRoutineTasks.map((task) => task?._id.toString());
    }

    const routine = new Routine({
        deadline,
        completed,
        cheatDay,
        tasks: await selectAllTasksIdsAsync(),
        user: user._id
    });

    const savedRoutine = await routine.save();
    
    const getRoutine = await Routine.findOne({ _id: savedRoutine._id }).populate('tasks');

    await User.findOneAndUpdate({ _id: user._id }, { routine: savedRoutine._id });
    
    res.send({
        message: 'Success',
        routine: getRoutine,
    });
}

export default authMiddleware(requestMiddleware(create, { validation: { body: createSchema } }));