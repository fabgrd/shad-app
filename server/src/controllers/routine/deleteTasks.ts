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
  
    console.log('Tasks to remove:', tasksToRemove); // Ajoutez cette ligne pour vérifier les IDs des tâches à supprimer
  
    try {
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
      }
  
      const updatedRoutine = await Routine.findOne({ _id: routine._id }).populate('tasks');
  
      res.send({
        message: 'Tasks removed successfully',
        routine: updatedRoutine,
      });
    } catch (error) {
      console.error('Error in removeTasks controller:', error);
      res.status(500).send({ error: 'Internal Server Error' });
    }
  };

export default authMiddleware(requestMiddleware(removeTasks, { validation: { body: removeTasksSchema } }));
