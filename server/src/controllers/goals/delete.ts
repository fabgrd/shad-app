import { Request, RequestHandler } from 'express';
import requestMiddleware from '../../middleware/request-middleware';
import { authMiddleware } from '../../middleware/auth-middleware';
import User from '../../models/User';
import Goals from '../../models/Goals';
import logger from '../../logger';

interface DeleteGoalsReqBody {
    goalsToRemove: string[];
}

const deleteGoals: RequestHandler = async (req: Request<{}, {}, DeleteGoalsReqBody>, res) => {
    const { goalsToRemove } = req.body;

    const user = await User.findOne({ _id: req?.user?._id });
    if (!user) {
        return res.status(400).send({ error: 'User not found' });
    }

    if (goalsToRemove.length > 0) {
        try {
            await Goals.deleteMany({ _id: { $in: goalsToRemove } });
            user.goals = user.goals.filter(goal => !goalsToRemove.includes(goal.toString()));
            await user.save();

            const updatedUser = await User.findById(user._id)
                .populate('routine')
                .populate('goals')
                .populate('rewards');

            res.send({
                message: 'Goals deleted successfully',
                updatedUser: updatedUser?.toJSON(),
            });
        } catch (error) {
            logger.error('Error deleting goals:', error);
            res.status(500).send({
                error: 'An error occurred while deleting goals'
            });
        }
    } else {
        res.send({ message: 'No goals to remove' });
    }
};

export default authMiddleware(requestMiddleware(deleteGoals));
