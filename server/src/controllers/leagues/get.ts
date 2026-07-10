import { RequestHandler } from 'express';
import Leagues from '../../models/Leagues';
import User from '../../models/User';
import requestMiddleware from '../../middleware/request-middleware';
import { authMiddleware } from '../../middleware/auth-middleware';

const getLeagueById: RequestHandler = async (req, res) => {
    try {
        const { id } = req.params;
        const league = await Leagues.findById(id);
        
        if (!league) {
            return res.status(404).json({ message: 'League not found' });
        }

        const members = await User.find({
            _id: { $in: league.members.map(member => member.user) }
        }).select('_id username name leagueScore avatar');

        const sortedMembers = members.sort((a, b) => b.leagueScore - a.leagueScore);

        res.json({
            ...league.toObject(),
            members: sortedMembers
        });
    } catch (error) {
        console.error('Error in getLeagueById:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
};

export default requestMiddleware(getLeagueById);