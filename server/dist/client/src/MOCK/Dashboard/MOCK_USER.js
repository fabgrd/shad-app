"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.MOCK_USER_10 = exports.MOCK_USER_9 = exports.MOCK_USER_8 = exports.MOCK_USER_7 = exports.MOCK_USER_6 = exports.MOCK_USER_5 = exports.MOCK_USER_4 = exports.MOCK_USER_3 = exports.MOCK_USER_2 = exports.MOCK_USER_1 = void 0;
const MOCK_ROUTINE_1 = __importDefault(require("./MOCK_ROUTINE"));
const MOCK_GOALS_1 = __importDefault(require("./MOCK_GOALS"));
const MOCK_REWARDS_1 = __importDefault(require("./MOCK_REWARDS"));
const MOCK_PREVIOUS_ROUTINES_1 = __importDefault(require("./MOCK_PREVIOUS_ROUTINES"));
const MOCK_USER_1 = {
    id: "507f1f77bcf86cd799439011",
    name: "John Doe",
    username: "TheDoe",
    email: "john@gmail.com",
    photo: "https://i.pravatar.cc/150?img=1",
    createdAt: new Date(),
    followers: [""],
    following: [""],
    currentLeague: 1,
    leagueScore: 35,
    achievements: [1, 0, 2, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    streak: 15,
    lastStreak: 3,
    lastStreakDate: new Date().toISOString(),
    routine: MOCK_ROUTINE_1.default,
    previousRoutineEnding: MOCK_PREVIOUS_ROUTINES_1.default,
    goals: MOCK_GOALS_1.default,
    rewards: MOCK_REWARDS_1.default,
};
exports.MOCK_USER_1 = MOCK_USER_1;
const MOCK_USER_2 = {
    id: "507f1f77bcf86cd799439012",
    name: "Jane Smith",
    username: "JaneS",
    email: "jane@gmail.com",
    photo: "https://i.pravatar.cc/150?img=2",
    createdAt: new Date(),
    followers: ["1"],
    following: ["3"],
    currentLeague: 2,
    leagueScore: 58,
    achievements: [2, 1, 1, 1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0],
    streak: 20,
    lastStreak: 5,
    lastStreakDate: new Date().toISOString(),
    routine: MOCK_ROUTINE_1.default,
    previousRoutineEnding: MOCK_PREVIOUS_ROUTINES_1.default,
    goals: MOCK_GOALS_1.default,
    rewards: MOCK_REWARDS_1.default,
};
exports.MOCK_USER_2 = MOCK_USER_2;
const MOCK_USER_3 = {
    id: "507f1f77bcf86cd799439013",
    name: "Emily Brown",
    username: "EmilyB",
    email: "emily@gmail.com",
    photo: "https://i.pravatar.cc/150?img=3",
    createdAt: new Date(),
    followers: ["1", "2"],
    following: ["2"],
    currentLeague: 1,
    leagueScore: 20,
    achievements: [1, 0, 2, 0, 0, 0, 1, 0, 0, 0, 0, 0, 1, 0],
    streak: 10,
    lastStreak: 2,
    lastStreakDate: new Date().toISOString(),
    routine: MOCK_ROUTINE_1.default,
    previousRoutineEnding: MOCK_PREVIOUS_ROUTINES_1.default,
    goals: MOCK_GOALS_1.default,
    rewards: MOCK_REWARDS_1.default,
};
exports.MOCK_USER_3 = MOCK_USER_3;
const MOCK_USER_4 = {
    id: "507f1f77bcf86cd799439014",
    name: "Michael Jordan",
    username: "MJ23",
    email: "michael@gmail.com",
    photo: "https://i.pravatar.cc/150?img=4",
    createdAt: new Date(),
    followers: ["2", "3"],
    following: ["1", "3"],
    currentLeague: 0,
    leagueScore: 14,
    achievements: [3, 2, 0, 1, 0, 0, 0, 1, 0, 0, 0, 0, 0, 1],
    streak: 25,
    lastStreak: 8,
    lastStreakDate: new Date().toISOString(),
    routine: MOCK_ROUTINE_1.default,
    previousRoutineEnding: MOCK_PREVIOUS_ROUTINES_1.default,
    goals: MOCK_GOALS_1.default,
    rewards: MOCK_REWARDS_1.default,
};
exports.MOCK_USER_4 = MOCK_USER_4;
const MOCK_USER_5 = {
    id: "507f1f77bcf86cd799439015",
    name: "Laura Wilson",
    username: "LWilson",
    email: "laura@gmail.com",
    photo: "https://i.pravatar.cc/150?img=5",
    createdAt: new Date(),
    followers: ["1", "3", "4"],
    following: ["2", "3"],
    currentLeague: 2,
    leagueScore: 10,
    achievements: [1, 0, 0, 0, 0, 1, 1, 0, 0, 0, 0, 1, 0, 0],
    streak: 5,
    lastStreak: 1,
    lastStreakDate: new Date().toISOString(),
    routine: MOCK_ROUTINE_1.default,
    previousRoutineEnding: MOCK_PREVIOUS_ROUTINES_1.default,
    goals: MOCK_GOALS_1.default,
    rewards: MOCK_REWARDS_1.default,
};
exports.MOCK_USER_5 = MOCK_USER_5;
const MOCK_USER_6 = {
    id: "507f1f77bcf86cd799439016",
    name: "Alex Turner",
    username: "ATurner",
    email: "alex@gmail.com",
    photo: "https://i.pravatar.cc/150?img=6",
    createdAt: new Date(),
    followers: ["1", "2"],
    following: ["3", "4"],
    currentLeague: 3,
    leagueScore: 45,
    achievements: [2, 1, 1, 0, 1, 1, 0, 0, 0, 0, 1, 0, 0, 0],
    streak: 12,
    lastStreak: 4,
    lastStreakDate: new Date().toISOString(),
    routine: MOCK_ROUTINE_1.default,
    previousRoutineEnding: MOCK_PREVIOUS_ROUTINES_1.default,
    goals: MOCK_GOALS_1.default,
    rewards: MOCK_REWARDS_1.default,
};
exports.MOCK_USER_6 = MOCK_USER_6;
const MOCK_USER_7 = {
    id: "507f1f77bcf86cd799439017",
    name: "Sarah Connor",
    username: "SConnor",
    email: "sarah@gmail.com",
    photo: "https://i.pravatar.cc/150?img=7",
    createdAt: new Date(),
    followers: ["3", "4"],
    following: ["1", "5"],
    currentLeague: 4,
    leagueScore: 72,
    achievements: [3, 2, 1, 1, 1, 0, 0, 1, 1, 0, 0, 0, 1, 0],
    streak: 18,
    lastStreak: 6,
    lastStreakDate: new Date().toISOString(),
    routine: MOCK_ROUTINE_1.default,
    previousRoutineEnding: MOCK_PREVIOUS_ROUTINES_1.default,
    goals: MOCK_GOALS_1.default,
    rewards: MOCK_REWARDS_1.default,
};
exports.MOCK_USER_7 = MOCK_USER_7;
const MOCK_USER_8 = {
    id: "507f1f77bcf86cd799439018",
    name: "David Lee",
    username: "DLee",
    email: "david@gmail.com",
    photo: "https://i.pravatar.cc/150?img=8",
    createdAt: new Date(),
    followers: ["2", "5"],
    following: ["1", "4"],
    currentLeague: 2,
    leagueScore: 38,
    achievements: [1, 1, 2, 0, 0, 1, 1, 0, 0, 1, 0, 0, 0, 1],
    streak: 8,
    lastStreak: 3,
    lastStreakDate: new Date().toISOString(),
    routine: MOCK_ROUTINE_1.default,
    previousRoutineEnding: MOCK_PREVIOUS_ROUTINES_1.default,
    goals: MOCK_GOALS_1.default,
    rewards: MOCK_REWARDS_1.default,
};
exports.MOCK_USER_8 = MOCK_USER_8;
const MOCK_USER_9 = {
    id: "507f1f77bcf86cd799439019",
    name: "Emma Watson",
    username: "EWatson",
    email: "emma@gmail.com",
    photo: "https://i.pravatar.cc/150?img=9",
    createdAt: new Date(),
    followers: ["1", "3", "5"],
    following: ["2", "4", "6"],
    currentLeague: 1,
    leagueScore: 25,
    achievements: [2, 0, 1, 1, 1, 0, 0, 1, 0, 0, 1, 0, 0, 0],
    streak: 14,
    lastStreak: 5,
    lastStreakDate: new Date().toISOString(),
    routine: MOCK_ROUTINE_1.default,
    previousRoutineEnding: MOCK_PREVIOUS_ROUTINES_1.default,
    goals: MOCK_GOALS_1.default,
    rewards: MOCK_REWARDS_1.default,
};
exports.MOCK_USER_9 = MOCK_USER_9;
const MOCK_USER_10 = {
    id: "507f1f77bcf86cd799439020",
    name: "Chris Evans",
    username: "CEvans",
    email: "chris@gmail.com",
    photo: "https://i.pravatar.cc/150?img=10",
    createdAt: new Date(),
    followers: ["2", "4", "6"],
    following: ["1", "3", "5"],
    currentLeague: 3,
    leagueScore: 55,
    achievements: [2, 1, 1, 2, 0, 0, 1, 0, 1, 0, 0, 1, 0, 0],
    streak: 22,
    lastStreak: 7,
    lastStreakDate: new Date().toISOString(),
    routine: MOCK_ROUTINE_1.default,
    previousRoutineEnding: MOCK_PREVIOUS_ROUTINES_1.default,
    goals: MOCK_GOALS_1.default,
    rewards: MOCK_REWARDS_1.default,
};
exports.MOCK_USER_10 = MOCK_USER_10;
