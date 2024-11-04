import Leagues from '../models/League';
import { ILeagues } from '../models/League';
import User from '../models/User';
import mongoose from 'mongoose';

const LEAGUE_NAMES = [
    "Worm",
    "Cockroach",
    "Fly",
    "Bee",
    "Bumblebee",
    "Beetle",
    "Mantis",
    "Butterfly"
];

// Fonction pour créer des utilisateurs mockés avec des scores aléatoires
async function createMockUsers(leagueId: string, leagueLevel: number) {
    const users: mongoose.Types.ObjectId[] = []; // Définition explicite du type

    for (let i = 0; i < 20; i++) {
        const user = await User.create({
            name: `User ${leagueId}-${i + 1}`,
            email: `user${leagueId}${i + 1}@test.com`,
            password: 'password123',
            leagueScore: Math.floor(Math.random() * 100),
            currentLeague: leagueLevel,
            achievements: Array(14).fill(0),
            streak: Math.floor(Math.random() * 30),
            lastStreak: Math.floor(Math.random() * 10),
            lastStreakDate: new Date(),
            routine: [],
            goals: [],
            rewards: [],
        });
        users.push(user._id);
    }
    return users;
}

// Fonction pour simuler la promotion/relégation
async function processLeaguePromotionsRelegations() {
    for (let leagueLevel = 0; leagueLevel < LEAGUE_NAMES.length; leagueLevel++) {
        const league = await Leagues.findOne({ level: leagueLevel });
        if (!league) continue;

        // Récupérer tous les utilisateurs de la ligue
        const users = await User.find({ currentLeague: leagueLevel })
            .sort({ leagueScore: -1 });

        // Promotion des 10 premiers (sauf pour la dernière ligue)
        if (leagueLevel < LEAGUE_NAMES.length - 1) {
            const promotedUsers = users.slice(0, 10);
            for (const user of promotedUsers) {
                user.currentLeague = leagueLevel + 1;
                user.leagueScore = 0; // Reset score après promotion
                await user.save();
            }
        }

        // Relégation des 5 derniers (sauf pour la première ligue)
        if (leagueLevel > 0) {
            const relegatedUsers = users.slice(-5);
            for (const user of relegatedUsers) {
                user.currentLeague = leagueLevel - 1;
                user.leagueScore = 0; // Reset score après relégation
                await user.save();
            }
        }
    }
}

// Fonction principale pour créer les ligues
async function createMockLeagues() {
    try {
        await Leagues.deleteMany({});
        await User.deleteMany({});

        const leagues: ILeagues[] = []; // Définition explicite du type

        for (let i = 0; i < LEAGUE_NAMES.length; i++) {
            const users = await createMockUsers(LEAGUE_NAMES[i], i);
            const league = await Leagues.create({
                name: LEAGUE_NAMES[i],
                members: users,
                icon: LEAGUE_NAMES[i].toLowerCase(),
                level: i,
                resetDate: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000),
            });
            leagues.push(league as ILeagues); // Cast explicite
        }

        console.log('Leagues created:', leagues);
        await processLeaguePromotionsRelegations();
        console.log('Promotions and relegations processed');

    } catch (error) {
        console.error('Error in createMockLeagues:', error);
    }
}

// Exécution si appelé directement
if (require.main === module) {
    mongoose.connect('mongodb+srv://shad_user:OAuWog0JvESB9I8a@shad.gjywb7d.mongodb.net/')
        .then(() => createMockLeagues())
        .then(() => {
            console.log('Mock leagues created successfully');
            process.exit(0);
        })
        .catch((error) => {
            console.error('Error:', error);
            process.exit(1);
        });
}

export { createMockLeagues, processLeaguePromotionsRelegations };