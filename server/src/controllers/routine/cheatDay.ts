import { Request, RequestHandler } from 'express';
import requestMiddleware from '../../middleware/request-middleware';
import { authMiddleware } from '../../middleware/auth-middleware';
import User from '../../models/User';
import Routine from '../../models/Routine';

const cheatDay: RequestHandler = async (req: Request<{}, {}>, res) => {
    const user = await User.findOne({ _id: req?.user?._id });

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

    const userRoutine = await Routine.findOne({ _id: user.routine }).populate('tasks');

    if (!userRoutine) {
        return res.status(400).send({
            error: 'Routine not found'
        });
    }

    userRoutine.tasks.forEach((task) => {
        task.completed = true;
        user.leagueScore += 10;
        task.save();
    });

    userRoutine.cheatDay = true;
    userRoutine.completed = true;

    await userRoutine.save();

    user.previousRoutineEnding.push(new Date());
    user.streak += 1;
    user.achievements[0] += 1;

    await user.save();

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

export default authMiddleware(requestMiddleware(cheatDay));