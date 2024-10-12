import { Request, RequestHandler } from 'express';
import Joi from 'joi';
import requestMiddleware from '../../middleware/request-middleware';
import { authMiddleware } from '../../middleware/auth-middleware';
import User from '../../models/User';
import Rewards from '../../models/Rewards';
import logger from '../../logger';

// req.body is an array of reward IDs to delete
interface deleteReqBody {
    rewardIds: string[];
}

const deleteRewards: RequestHandler = async (req: Request<{}, {}, deleteReqBody>, res) => {
    const user = await User.findOne({ _id: req?.user?._id });

    if (!user) {
        return res.status(400).send({
            error: 'User not found'
        });
    }

    try {
        // Filter out the rewards to delete
        const rewardsToDelete = req.body.rewardIds;

        // Remove the rewards from the user's reward list
        user.rewards = user.rewards.filter((rewardId) => !rewardsToDelete.includes(rewardId.toString()));
        
        // Remove the rewards from the Rewards collection
        await Rewards.deleteMany({ _id: { $in: rewardsToDelete } });

        // Save the updated user
        await user.save();

        return res.send({
            message: 'Rewards successfully deleted'
        });
    } catch (error) {
        logger.error('Error deleting rewards: ', error);
        return res.status(500).send({
            error: 'An error occurred while deleting rewards'
        });
    }
};

export default authMiddleware(requestMiddleware(deleteRewards));
