import cron from 'node-cron';

import User from '../models/User';

const leagueCron = async () => {
    cron.schedule('0 0 * * 0', async () => {
        const users = await User.find();
        let leaderboard: any = [];
        users.forEach(async (user) => {
            leaderboard.push({
                userId: user._id,
                leagueScore: user.leagueScore
            });
        });

        leaderboard = leaderboard.sort((a: any, b: any) => b.leagueScore - a.leagueScore);

        const top3 = leaderboard.slice(0, 3);

        top3.forEach(async (user: any) => {
            const userToUpdate = await User.findOne({ _id: user.userId });
            (userToUpdate as any).achievements[2] += 1;
            (userToUpdate as any).currentLeague = user.currentLeague + 1;
            (userToUpdate as any).leagueScore = 0;
            await (userToUpdate as any).save();
        });
    });
};

export default leagueCron;