import cron from 'node-cron';
import mongoose from 'mongoose';
import User from '../models/User';
import League from '../models/League';
import { MOCK_USER_1, MOCK_USER_2 } from '../MOCK/MOCK_USER';

// Fonction pour générer les utilisateurs mockés
const generateMockUsers = (baseUser: any, count: number, leagueLevel: number) => {
    return Array.from({ length: count }, (_, i) => ({
        _id: new mongoose.Types.ObjectId(),
        name: `${baseUser.name}_${i}`,
        email: `${baseUser.email.split('@')[0]}_${i}@test.com`,
        username: `${baseUser.username}_${i}`,
        password: baseUser.password,
        currentLeague: leagueLevel,
        leagueScore: Math.floor(Math.random() * 100),
        achievements: Array(14).fill(0),
        streak: 0,
        lastStreak: 0,
        lastStreakDate: new Date(),
        birthDate: baseUser.birthDate || new Date("1990-01-01"),  // Date de naissance par défaut
        genre: baseUser.genre || "non spécifié",  // Genre par défaut
        routine: new mongoose.Types.ObjectId(),
        goals: baseUser.goals,
        rewards: baseUser.rewards,
    }));
};

const ensureLeagueCapacity = async (level: number) => {
    console.log(`🔍 Checking leagues at level ${level} for available space...`);

    // Récupère les ligues du niveau spécifié, ordonnées par date de création
    const leagues = await League.find({ level }).sort({ createdAt: 1 });
    console.log(`📋 Found ${leagues.length} leagues at level ${level}`);

    for (const league of leagues) {
        console.log(`➡️ Checking league ${league._id} with ${league.members.length} members`);
        if (league.members.length < 20) {
            console.log(`✅ League ${league._id} has space. Returning this league.`);
            return league;
        }
    }

    console.log(`🚀 No available leagues at level ${level}. Creating a new league...`);
    const newLeague = new League({
        name: `League ${level} - ${leagues.length + 1}`, // Numéro pour différencier les ligues
        members: [],
        icon: "default_icon.png",
        resetDate: new Date(),
        level,
    });
    await newLeague.save();
    console.log(`🎉 New league created with ID ${newLeague._id} at level ${level}`);
    return newLeague;
};

const processLeagues = async () => {
    try {
        console.log('🔄 Starting processLeagues...');
        let allUsers = await User.find();
        console.log(`📊 Found ${allUsers.length} users in the database`);

        if (allUsers.length < 20) {
            console.log('⚠️ Not enough users in DB, adding mock users');
            const mockUsers = [
                ...generateMockUsers(MOCK_USER_1, 10, 0),
                ...generateMockUsers(MOCK_USER_2, 10, 0),
            ];
            await User.insertMany(mockUsers);
            allUsers = await User.find(); 
            console.log(`🎉 Added ${mockUsers.length} mock users to the database`);
        }

        for (let level = 0; level <= 4; level++) {
            const usersInLeague = allUsers.filter(user => user.currentLeague === level);
            if (usersInLeague.length === 0) continue;

            console.log(`\n🏆 Processing League Level ${level} with ${usersInLeague.length} users`);

            const leaderboard = usersInLeague.map((user) => ({
                _id: user._id,
                name: user.name,
                leagueScore: user.leagueScore,
                currentLeague: user.currentLeague,
            }));

            const sortedLeaderboard = leaderboard.sort((a, b) => b.leagueScore - a.leagueScore);
            const top10 = sortedLeaderboard.slice(0, 10);
            const bottom5 = sortedLeaderboard.slice(-5);

            console.log(`\n🔼 Promoting top 10 users from League ${level}`);
            await Promise.all(top10.map(async (user) => {
                const userToUpdate = await User.findById(user._id);
                if (userToUpdate && userToUpdate.currentLeague < 4) {
                    console.log(`⬆️ Promoting ${userToUpdate.name} from League ${userToUpdate.currentLeague}`);
                    userToUpdate.currentLeague += 1;
                    userToUpdate.leagueScore = 0;

                    const league = await ensureLeagueCapacity(userToUpdate.currentLeague);
                    if (league) {
                        league.members.push(userToUpdate._id.toString());
                        await league.save();
                    }
                    await userToUpdate.save();
                    
                    console.log(`✅ ${userToUpdate.name} promoted to League ${userToUpdate.currentLeague} (League ID: ${league._id})`);
                } else {
                    console.log(`ℹ️ ${userToUpdate ? userToUpdate.name : 'User'} is already at the highest league or not found`);
                }
            }));

            console.log(`\n🔽 Relegating bottom 5 users from League ${level}`);
            await Promise.all(bottom5.map(async (user) => {
                const userToUpdate = await User.findById(user._id);
                if (userToUpdate && userToUpdate.currentLeague > 0) {
                    console.log(`⬇️ Relegating ${userToUpdate.name} from League ${userToUpdate.currentLeague}`);
                    userToUpdate.currentLeague -= 1;
                    userToUpdate.leagueScore = 0;

                    const league = await ensureLeagueCapacity(userToUpdate.currentLeague);
                    if (league) {
                        league.members.push(userToUpdate._id.toString());
                        await league.save();
                    }
                    await userToUpdate.save();
                    
                    console.log(`✅ ${userToUpdate.name} relegated to League ${userToUpdate.currentLeague} (League ID: ${league._id})`);
                } else {
                    console.log(`ℹ️ ${userToUpdate ? userToUpdate.name : 'User'} is already at the lowest league or not found`);
                }
            }));
        }

        console.log('✅ League cron job completed successfully');
    } catch (error) {
        console.error('❌ Error in league cron job:', error);
    }
};

const leagueCron = () => {
    cron.schedule('* * * * *', async () => {
        console.log('🕒 Starting league cron job...');
        await processLeagues();
    });
};

export default leagueCron;
