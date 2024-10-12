import { Request, RequestHandler } from 'express';
import Joi from 'joi';
import requestMiddleware from '../../middleware/request-middleware';
import { authMiddleware } from '../../middleware/auth-middleware';
import User from '../../models/User';
import Rewards from '../../models/Rewards';

// Schéma de validation pour l'ajout de récompenses
export const addRewardsSchema = Joi.object().keys({
    rewards: Joi.array().items(Joi.object({
        remainingDays: Joi.date().required(),
        title: Joi.string().required(),
    })).required()
});

interface AddRewardsReqBody {
    rewards: {
        remainingDays: Date;
        title: string;
    }[];
}

const addRewards: RequestHandler = async (req: Request<{}, {}, AddRewardsReqBody>, res) => {
    const { rewards } = req.body;

    // Trouve l'utilisateur connecté
    const user = await User.findOne({ _id: req?.user?._id });

    if (!user) {
        return res.status(400).send({
            error: 'User not found'
        });
    }

    // Crée les nouvelles récompenses et les associe à l'utilisateur
    const createRewardsAsync = async () => {
        return Promise.all(rewards.map(async (reward) => {
            const newReward = new Rewards({
                remainingDays: reward.remainingDays,
                title: reward.title,
                user: user._id // Associer la récompense à l'utilisateur
            });

            user.rewards.push(newReward._id);
            await newReward.save();
        }));
    };

    await createRewardsAsync();
    await user.save();

    try {
        const updatedUser = await User.findById(user._id)
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

export default authMiddleware(requestMiddleware(addRewards, { validation: { body: addRewardsSchema } }));
