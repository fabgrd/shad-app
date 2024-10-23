import { Request, RequestHandler } from 'express';
import requestMiddleware from '../../middleware/request-middleware';
import { authMiddleware } from '../../middleware/auth-middleware';
import User from '../../models/User';
import Rewards from '../../models/Rewards';
import logger from '../../logger';

interface DeleteRewardsReqBody {
    rewardsToRemove: string[];
}

const deleteRewards: RequestHandler = async (req: Request<{}, {}, DeleteRewardsReqBody>, res) => {
    const { rewardsToRemove } = req.body;

    const user = await User.findOne({ _id: req?.user?._id });
    if (!user) {
        return res.status(400).send({ error: 'User not found' });
    }

    if (rewardsToRemove.length > 0) {
        try {
            await Rewards.deleteMany({ _id: { $in: rewardsToRemove } });
            user.rewards = user.rewards.filter(reward => !rewardsToRemove.includes(reward.toString()));
            await user.save();

            const updatedUser = await User.findById(user._id)
                .populate('routine')
                .populate('goals')
                .populate('rewards');

            res.send({
                message: 'Rewards deleted successfully',
                updatedUser: updatedUser?.toJSON(),
            });
        } catch (error) {
            logger.error('Error deleting rewards:', error);
            res.status(500).send({
                error: 'An error occurred while deleting rewards'
            });
        }
    } else {
        res.send({ message: 'No rewards to remove' });
    }
};

export default authMiddleware(requestMiddleware(deleteRewards));
