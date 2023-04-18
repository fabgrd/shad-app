"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const schema = new mongoose_1.Schema({
    username: { type: String, index: true, required: true },
    name: { type: String, index: true, required: true },
    email: { type: String, index: true, required: true },
    password: { type: String, index: true, required: true },
    genre: { type: String, index: true, required: true },
    birthDate: { type: Date, index: true, required: true },
    streak: { type: Number, index: true, required: true },
    currentLeague: { type: Number, index: true, required: true },
    achievements: { type: [Number], index: true, required: true },
    refreshToken: { type: String, index: true, required: false },
    routine: { type: mongoose_1.Schema.Types.ObjectId, ref: 'Routine' },
    previousRoutineEnding: { type: [Date], index: true, required: true },
    leagueScore: { type: Number, index: true, required: true },
    goals: { type: [mongoose_1.Schema.Types.ObjectId], ref: 'Goals' },
    rewards: { type: [mongoose_1.Schema.Types.ObjectId], ref: 'Rewards' },
    followers: { type: [mongoose_1.Schema.Types.ObjectId], ref: 'User' },
    following: { type: [mongoose_1.Schema.Types.ObjectId], ref: 'User' },
}, { timestamps: true });
const User = (0, mongoose_1.model)('User', schema);
exports.default = User;
