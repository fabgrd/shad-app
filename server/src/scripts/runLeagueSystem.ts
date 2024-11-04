import mongoose from 'mongoose';
import { createMockLeagues, processLeaguePromotionsRelegations } from '../Utils/TestLeague';

async function runLeagueSystem() {
    try {
        await mongoose.connect('mongodb+srv://shad_user:OAuWog0JvESB9I8a@shad.gjywb7d.mongodb.net/')
        
        console.log('Creating mock leagues...');
        await createMockLeagues();
        
        console.log('Processing promotions and relegations...');
        await processLeaguePromotionsRelegations();
        
        console.log('League system test completed successfully');
    } catch (error) {
        console.error('Error running league system:', error);
    } finally {
        await mongoose.connection.close();
    }
}

runLeagueSystem();