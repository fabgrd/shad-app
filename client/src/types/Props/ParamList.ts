import type { Achievement } from './../Achievements';
import type { User } from '../User';

export type ParamList = {
    user: User;
    achievements: Achievement[];
}

export type ProfileUserParamsList = {
    user: User;
}

export type AchievementsParamsList = {
    achievements: Achievement[];
}