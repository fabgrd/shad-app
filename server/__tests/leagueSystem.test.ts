import mongoose from 'mongoose';
import { createMockLeagues, processLeaguePromotionsRelegations } from '../src/Utils/TestLeague';
import User from '../src/models/User';
import Leagues from '../src/models/League';

describe('League System Tests', () => {
    beforeAll(async () => {
        await mongoose.connect('mongodb+srv://shad_user:OAuWog0JvESB9I8a@shad.gjywb7d.mongodb.net/')
    });

    afterAll(async () => {
        await mongoose.connection.dropDatabase();
        await mongoose.connection.close();
    });

    beforeEach(async () => {
        await User.deleteMany({});
        await Leagues.deleteMany({});
    });

    test('Should create mock leagues with correct structure', async () => {
        await createMockLeagues();
        const leagues = await Leagues.find().sort({ level: 1 });
        
        expect(leagues).toHaveLength(8);
        expect(leagues[0].name).toBe('Worm');
        expect(leagues[7].name).toBe('Butterfly');
        
        const usersCount = await User.countDocuments();
        expect(usersCount).toBe(160); // 20 users * 8 leagues
    });

    test('Should properly handle promotions and relegations', async () => {
        await createMockLeagues();
        await processLeaguePromotionsRelegations();

        // Vérifier les promotions
        const promotedUsers = await User.find({ 
            currentLeague: { $gt: 0 } 
        });
        expect(promotedUsers.length).toBeGreaterThan(0);

        // Vérifier les relégations
        const relegatedUsers = await User.find({ 
            currentLeague: 0,
            leagueScore: 0 
        });
        expect(relegatedUsers.length).toBeGreaterThan(0);
    });
});