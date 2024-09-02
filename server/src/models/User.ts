import {
    Model, Schema, model, Document
} from 'mongoose';

import { IRoutine } from './Routine';
import { IRewards } from './Rewards';
import { IGoals } from './Goals';

export interface IUser extends Document {
    /** Name of the user */
    username: string;
    /** How do you want we call you */
    name: string;
    email: string;
    password: string;
    genre: string;
    birthDate: Date;
    routine: IRoutine;
    refreshToken: string;
    streak: number;
    previousRoutineEnding: Date[];
    currentLeague: number;
    achievements: number[];
    createdAt: Date;
    updatedAt: Date;
    goals: IGoals[];
    rewards: IRewards[];
    followers: IUser[];
    following: IUser[];
    leagueScore: number;
}

interface IUserModal extends Model<IUser> { }

const schema = new Schema<IUser>({
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
    routine: { type: Schema.Types.ObjectId, ref: 'Routine' },
    previousRoutineEnding: { type: [Date], index: true, required: true },
    leagueScore: { type: Number, index: true, required: true, default: 0 },
    goals: { type: [Schema.Types.ObjectId], ref: 'Goals' },
    rewards: { type: [Schema.Types.ObjectId], ref: 'Rewards' },
    followers: { type: [Schema.Types.ObjectId], ref: 'User' },
    following: { type: [Schema.Types.ObjectId], ref: 'User' },
}, { timestamps: true });

const User: IUserModal = model<IUser, IUserModal>('User', schema);

export default User;
