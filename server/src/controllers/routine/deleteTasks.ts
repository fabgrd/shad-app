import { Request, RequestHandler } from 'express';
import Joi from 'joi';
import requestMiddleware from '../../middleware/request-middleware';
import { authMiddleware } from '../../middleware/auth-middleware';
import User from '../../models/User';
import Routine from '../../models/Routine';
import RoutineTasks from '../../models/RoutineTasks';

export const removeTasksSchema = Joi.object().keys({
    tasksToRemove: Joi.array().items(Joi.string()).required() // Array of task IDs to remove
});

interface RemoveTasksReqBody {
    tasksToRemove: string[];
}

const removeTasks: RequestHandler = async (req: Request<{}, {}, RemoveTasksReqBody>, res) => {
    const { tasksToRemove } = req.body;


    const user = await User.findOne({ _id: req?.user?._id });
    if (!user) {
        return res.status(400).send({ error: 'User not found' });
    }

    const routine = await Routine.findOne({ user: user._id }).populate('tasks');
    if (!routine) {
        return res.status(400).send({ error: 'Routine not found' });
    }

    if (tasksToRemove.length > 0) {
        await RoutineTasks.deleteMany({ _id: { $in: tasksToRemove } });
        routine.tasks = routine.tasks.filter(task => !tasksToRemove.includes(task._id.toString()));
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
    }
};

export default authMiddleware(requestMiddleware(removeTasks, { validation: { body: removeTasksSchema } }));
