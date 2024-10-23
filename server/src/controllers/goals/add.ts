import { Request, RequestHandler } from 'express';
import Joi from 'joi';
import requestMiddleware from '../../middleware/request-middleware';
import { authMiddleware } from '../../middleware/auth-middleware';
import User from '../../models/User';
import Goals from '../../models/Goals';

export const addGoalsSchema = Joi.object().keys({
    goals: Joi.array().items(Joi.object({
        delay: Joi.date().required(),
        goal: Joi.string().required(),
    })).required()
});

interface AddGoalsReqBody {
    goals: {
        delay: Date;
        goal: string;
    }[];
}

const addGoals: RequestHandler = async (req: Request<{}, {}, AddGoalsReqBody>, res) => {
    console.log('addGoals called with body:', req.body);
    const { goals } = req.body;

    const user = await User.findOne({ _id: req?.user?._id });

    if (!user) {
        return res.status(400).send({
            error: 'User not found'
        });
    }

    const createGoalsAsync = async () => {
        return Promise.all(goals.map(async (goal) => {
            const newGoal = new Goals({
                delay: goal.delay,
                goal: goal.goal,
                user: user._id
            });

            user.goals.push(newGoal._id);
            await newGoal.save();
        }));
    };

    await createGoalsAsync();
    await user.save();

    try {
        const updatedUser = await User.findById(user._id)
            .populate('goals')
            .populate('rewards')
            .populate('routine');

        console.log('Updated user:', updatedUser);

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

export default authMiddleware(requestMiddleware(addGoals));
