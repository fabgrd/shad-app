import { RequestHandler } from 'express';
import Joi from 'joi';
import Leagues from '../../models/Leagues';
import requestMiddleware from '../../middleware/request-middleware';
import { authMiddleware } from '../../middleware/auth-middleware';

const updateMemberScoreSchema = Joi.object({
    score: Joi.number().required(),
});

const updateMemberScore: RequestHandler = async (req, res) => {
    const { leagueId, userId } = req.params;
    const { score } = req.body;

    const league = await Leagues.findById(leagueId);
    if (!league) {
        return res.status(404).send({ error: 'League not found' });
    }

    const member = league.members.find((m) => m.user.toString() === userId);
    if (!member) {
        return res.status(404).send({ error: 'Member not found in this league' });
    }

    member.score = score;
    await league.save();

    res.send({ message: 'Score updated successfully', league });
};

export default authMiddleware(requestMiddleware(updateMemberScore, { validation: { body: updateMemberScoreSchema } }));
