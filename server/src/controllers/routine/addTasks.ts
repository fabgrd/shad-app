import { Request, RequestHandler } from 'express';
import Joi from 'joi';
import requestMiddleware from '../../middleware/request-middleware';
import { authMiddleware } from '../../middleware/auth-middleware';
import User from '../../models/User';
import Routine from '../../models/Routine';
import RoutineTasks from '../../models/RoutineTasks';

export const addTasksSchema = Joi.object().keys({
    tasksToAdd: Joi.array().items(Joi.object({
        title: Joi.string().required(),
        score: Joi.number().required(),
        completed: Joi.boolean().required()
    })).required()
});

interface AddTasksReqBody {
    tasksToAdd: {
        title: string;
        score: number;
        completed: boolean;
    }[];
}

const addTasks: RequestHandler = async (req: Request<{}, {}, AddTasksReqBody>, res) => {
    const { tasksToAdd } = req.body;

    // Trouve l'utilisateur connecté
    const user = await User.findOne({ _id: req?.user?._id });

    if (!user) {
        return res.status(400).send({
            error: 'User not found'
        });
    }

    // Trouve la routine associée à l'utilisateur
    const routine = await Routine.findOne({ _id: user.routine._id }).populate('tasks');

    if (!routine) {
        return res.status(400).send({
            error: 'Routine not found'
        });
    }

    // Crée les nouvelles tâches en les associant à la routine et à l'utilisateur
    const createTasksAsync = async () => {
        return Promise.all(tasksToAdd.map(async (task) => {
            const routineTask = new RoutineTasks({
                title: task.title,
                score: task.score,
                completed: task.completed,
                user: user._id, // Associer la tâche à l'utilisateur
                routine: routine._id // Associer la tâche à la routine
            });

            return await routineTask.save();
        }));
    };

    const newTasks = await createTasksAsync();

    // Ajoute les nouvelles tâches à la routine en ajoutant leurs identifiants
    routine.tasks.push(...newTasks.map(task => task._id));
    await routine.save();

    try {
        const updatedUser = await User.findById(user._id)
            .populate({
                path: 'routine',
                populate: {
                    path: 'tasks',
                    model: 'RoutineTasks'
                }
            })
            .populate('goals')
            .populate('rewards');

        res.send({
            message: 'Success',
            updatedUser: updatedUser?.toJSON(),
        });
    } catch (error) {
        console.error('Error fetching updated user:', error);
        res.status(500).send({
            error: 'Failed to retrieve updated user'
        });
    }
    // // Récupère la routine mise à jour avec les nouvelles tâches
    // const updatedRoutine = await Routine.findOne({ _id: routine._id }).populate('tasks');

    // res.send({
    //     message: 'Tasks added successfully',
    //     routine: updatedRoutine,
    // });
}

export default authMiddleware(requestMiddleware(addTasks, { validation: { body: addTasksSchema } }));
