import { RequestHandler } from 'express';
import Joi from 'joi';
import Leagues from '../../models/Leagues';
import User from '../../models/User';
import requestMiddleware from '../../middleware/request-middleware';
import { authMiddleware } from '../../middleware/auth-middleware';

const addMemberToLeagueSchema = Joi.object({
    userId: Joi.string().required(),
    score: Joi.number().default(0),
});

const addMemberToLeague: RequestHandler = async (req, res) => {
    const { leagueId } = req.params;
    const { userId, score } = req.body;

    const league = await Leagues.findById(leagueId);
    if (!league) {
        return res.status(404).send({ error: 'League not found' });
    }

    const user = await User.findById(userId);
    if (!user) {
        return res.status(404).send({ error: 'User not found' });
    }

    // Ajout du membre à la ligue
    league.members.push({ user: user._id, score, joinedAt: new Date() });
    await league.save();

    res.send({ message: 'Member added successfully', league });
};

export default authMiddleware(requestMiddleware(addMemberToLeague, { validation: { body: addMemberToLeagueSchema } }));
