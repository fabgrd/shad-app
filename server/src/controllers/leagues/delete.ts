import { RequestHandler } from 'express';
import Leagues from '../../models/Leagues';
import requestMiddleware from '../../middleware/request-middleware';
import { authMiddleware } from '../../middleware/auth-middleware';

const deleteMemberFromLeague: RequestHandler = async (req, res) => {
    const { leagueId, userId } = req.params;

    const league = await Leagues.findById(leagueId);
    if (!league) {
        return res.status(404).send({ error: 'League not found' });
    }

    league.members = league.members.filter((m) => m.user.toString() !== userId);
    await league.save();

    res.send({ message: 'Member removed successfully', league });
};

export default authMiddleware(requestMiddleware(deleteMemberFromLeague));
