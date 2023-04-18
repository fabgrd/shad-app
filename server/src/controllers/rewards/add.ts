import { Request, RequestHandler } from 'express';
import Joi from 'joi';
import requestMiddleware from '../../middleware/request-middleware';
import { authMiddleware } from '../../middleware/auth-middleware';
import User from '../../models/User';
import Rewards from '../../models/Rewards';
import logger from '../../logger';

// req.body is an array of objects
interface addReqBody {
    rewards: {
        remainingDays: Date;
        title: string;
    }[];
}

const add: RequestHandler = async (req: Request<{}, {}, addReqBody>, res) => {
    const user = await User.findOne({ _id: req?.user?._id });

    if (!user) {
        return res.status(400).send({
            error: 'User not found'
        });
    }

    const addRewardsAsync = async () => {
        return Promise.all(req.body.rewards.map(async (reward) => {
            const newReward = new Rewards({
                remainingDays: reward.remainingDays,
                title: reward.title,
                user: user._id
            });
            user.rewards.push(newReward._id);
            await user.save();
            await newReward.save();
        }));
    }

    await addRewardsAsync();
    return res.send({
        message: 'Success'
    });
}

export default authMiddleware(requestMiddleware(add));