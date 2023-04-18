import { Request, RequestHandler } from 'express';
import Joi from 'joi';
import requestMiddleware from '../../middleware/request-middleware';
import { authMiddleware } from '../../middleware/auth-middleware';
import User from '../../models/User';
import Rewards from '../../models/Rewards';
import logger from '../../logger';


const get: RequestHandler = async (req: Request<{}, {}>, res) => {

    const user = await User.findOne({ _id: req?.user?._id });

    if (!user) {
        return res.status(400).send({
            error: 'User not found'
        });
    }

    const rewards = await Rewards.find({ user: user?._id });

    res.send({
        message: 'Success',
        rewards
    });

}

export default authMiddleware(requestMiddleware(get));