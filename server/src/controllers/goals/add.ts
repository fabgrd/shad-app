import { Request, RequestHandler } from 'express';
import Joi from 'joi';
import requestMiddleware from '../../middleware/request-middleware';
import { authMiddleware } from '../../middleware/auth-middleware';
import User from '../../models/User';
import Goals from '../../models/Goals';
import logger from '../../logger';

// req.body is an array of objects
interface addReqBody {
    goals: {
        delay: Date;
        goal: string;
    }[];
}

const add: RequestHandler = async (req: Request<{}, {}, addReqBody>, res) => {
    const user = await User.findOne({ _id: req?.user?._id });

    if (!user) {
        return res.status(400).send({
            error: 'User not found'
        });
    }

    const addGoalsAsync = async () => {
        return Promise.all(req.body.goals.map(async (goal) => {
            const newGoal = new Goals({
                delay: goal.delay,
                goal: goal.goal,
                user: user._id
            });
            user.goals.push(newGoal._id);
            await user.save();
            await newGoal.save();
        }));
    }

    await addGoalsAsync();
    return res.send({
        message: 'Success'
    });
}

export default authMiddleware(requestMiddleware(add));