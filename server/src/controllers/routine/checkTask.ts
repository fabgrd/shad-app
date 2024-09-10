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

    // Trouver l'utilisateur
    const user = await User.findOne({ _id: req?.user?._id });
    if (!user) {
        return res.status(400).send({
            error: 'User not found'
        });
    }

    // Trouver la routine de l'utilisateur
    const userRoutine = await Routine.findOne({ _id: user.routine }).populate('tasks');
    if (!userRoutine) {
        return res.status(400).send({
            error: 'Routine not found'
        });
    }

    console.log('userRoutine', userRoutine);
    console.log('userRoutine.tasks', userRoutine.tasks);

    // Trouver la tâche à mettre à jour
    const task = userRoutine.tasks.find((task) => task._id.toString() === taskId);
    if (!task) {
        return res.status(400).send({
            error: 'Task not found'
        });
    }

    // Mettre à jour le statut de la tâche
    task.completed = completed;

    // Sauvegarder la tâche
    await userRoutine.save();

    // Vérifier si toutes les tâches sont complètes
    const allTasksCompleted = userRoutine.tasks.every((task) => task.completed);
    if (allTasksCompleted) {
        userRoutine.completed = allTasksCompleted;

        // Mettre à jour l'utilisateur
        user.previousRoutineEnding.push(new Date());
        user.streak += 1;
        user.achievements[1] += 1;
        user.leagueScore += 10;

        await user.save();
    }

    // Renvoi de la réponse avec les informations mises à jour
    const updatedUser = await User.findOne({ _id: user._id })
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
}

export default authMiddleware(requestMiddleware(checkTask, { validation: { body: checkTaskSchema } }));
