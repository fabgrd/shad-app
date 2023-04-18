import { Request, RequestHandler } from 'express';
import Joi from 'joi';
import requestMiddleware from '../../middleware/request-middleware';
import { authMiddleware } from '../../middleware/auth-middleware';
import User from '../../models/User';
import Routine from '../../models/Routine';

export const checkTaskSchema = Joi.object().keys({
    completed: Joi.boolean().required(),
    taskId: Joi.string().required()
});

interface checkTaskBody {
    completed: boolean;
    taskId: string;
}

const checkTask: RequestHandler = async (req: Request<{}, {}, checkTaskBody>, res) => {
    const { completed, taskId } = req.body;

    console.log('completed', completed);
    console.log('taskId', taskId);

    const user = await User.findOne({ _id: req?.user?._id });

    console.log('req?.user?._id', req?.user?._id);

    console.log('user', user);

    if (!user) {
        return res.status(400).send({
            error: 'User not found'
        });
    }

    if (!user.routine) {
        return res.status(400).send({
            error: 'Routine not found'
        });
    }

    const userRoutine = await Routine.findOne({ _id: user.routine });

    if (!userRoutine) {
        return res.status(400).send({
            error: 'Routine not found'
        });
    }

    const getRoutine = await Routine.findOne({ _id: user.routine }).populate('tasks');

    if (!getRoutine) {
        return res.status(400).send({
            error: 'Routine not found'
        });
    }

    console.log('getRoutine', getRoutine);
    console.log('getRoutine.tasks', getRoutine.tasks);

    // task._id => _id: new ObjectId("640b08d81c1c216b3f488ac0"),

    const task = getRoutine.tasks.find((task) => task._id.toString() === taskId);

    if (!task) {
        return res.status(400).send({
            error: 'Task not found'
        });
    }

    // Check if all tasks are completed
    const allTasksCompleted = getRoutine.tasks.every((task) => task.completed);

    if (allTasksCompleted) {
        getRoutine.completed = allTasksCompleted;

        user.previousRoutineEnding.push(new Date());
        user.streak += 1;
        user.achievements[1] += 1;
        user.leagueScore += 10;

        await getRoutine.save();
        await user.save();

        return res.status(400).send({
            error: 'All tasks are completed'
        });
    }

    task.completed = completed;

    await task.save();

    const updatedUser = await User.findOneAndUpdate({ _id: user._id })
        .populate({
            path: 'routine',
            populate: {
                path: 'tasks',
                model: 'RoutineTasks'
            }
        })
        .populate({
            path: 'goals'
        })
        .populate({
            path: 'rewards'
        })

    res.send({
        message: 'Success',
        updatedUser: updatedUser?.toJSON(),
    });
}

export default authMiddleware(requestMiddleware(checkTask, { validation: { body: checkTaskSchema } }));