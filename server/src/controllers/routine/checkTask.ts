import e, { Request, RequestHandler } from 'express';
import Joi from 'joi';
import requestMiddleware from '../../middleware/request-middleware';
import { authMiddleware } from '../../middleware/auth-middleware';
import User from '../../models/User';
import Routine from '../../models/Routine';
import RoutineTasks from '../../models/RoutineTasks';  // Import du modèle RoutineTasks
import { log } from 'console';

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

    // Trouver l'utilisateur
    const user = await User.findById(req?.user?._id);
    if (!user) {
        return res.status(400).send({
            error: 'User not found'
        });
    }

    // Trouver la routine de l'utilisateur
    const userRoutine = await Routine.findById(user.routine).populate('tasks');
    if (!userRoutine) {
        return res.status(400).send({
            error: 'Routine not found'
        });
    }

    // Trouver la tâche à mettre à jour
    const task = await RoutineTasks.findById(taskId);
    if (!task) {
        return res.status(400).send({
            error: 'Task not found'
        });
    }

    // Mettre à jour le statut de la tâche
    task.completed = completed;
    console.log(`%%%%%%%%%%%%%%% task ${taskId} completed:`, task.completed);

    // Sauvegarder la tâche
    try {
        await task.save();
        console.log('Task saved successfully:', task);
    } catch (error) {
        console.error('Error saving task:', error);
        return res.status(500).send({
            error: 'Failed to save task'
        });
    }

    // Mettre à jour la routine selon l'état des tâches
    const allTasksCompleted = userRoutine.tasks.every((task: any) => task.completed);
    userRoutine.completed = allTasksCompleted;

    try {
        await userRoutine.save(); // Sauvegarde de la routine, peu importe le statut des tâches
        console.log('Routine saved successfully with updated tasks:', userRoutine);
    } catch (error) {
        console.error('Error saving routine:', error);
        return res.status(500).send({
            error: 'Failed to save routine'
        });
    }

    // Mettre à jour l'utilisateur uniquement si la routine est complétée
    if (allTasksCompleted) {
        console.log('---------------------- All tasks completed, updating user routine details');
        user.previousRoutineEnding.push(new Date());
        user.streak += 1;
        user.achievements[1] += 1;
        user.leagueScore += 10;
    }

    // Renvoi de la réponse avec les informations mises à jour
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

export default authMiddleware(requestMiddleware(checkTask, { validation: { body: checkTaskSchema } }));
