import { Achievement } from './Achievements';
import { Routine } from "./Routine";
import { Goal } from "./Goal";
import { Reward } from "./Reward";
import { League } from './League';

export type User = {
    // User info
    id: string;
    name: string;
    username: string;
    email: string;
    photo: string;
    createdAt: Date;
    // Followers & Following
    // TODO: Change to array of user
    followers: string[];
    // TODO: Change to array of user
    following: string[];
    // League
    currentLeague: number;
    leagueScore: number;
    // Achievements
    achievements: number[];
    // Streak
    streak: number;
    lastStreak: number;
    lastStreakDate: string;
    // Routine & Goals & Rewards
    routine: Routine;
    previousRoutineEnding: Routine[];
    goals: Goal[];
    rewards: Reward[];
};