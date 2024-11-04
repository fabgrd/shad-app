import mongoose from 'mongoose';
import { LEAGUE_NAMES } from '../Utils/constants';

export const MOCK_LEAGUES = LEAGUE_NAMES.map((name, index) => ({
    _id: new mongoose.Types.ObjectId(),
    name: name,
    members: [],
    icon: name.toLowerCase(),
    level: index,
    resetDate: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000)
}));