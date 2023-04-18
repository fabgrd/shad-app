import {
    Model, Schema, model, Document
} from 'mongoose';

export interface IAchievements extends Document {
    title: string;
    total: number;
    description: string;
    completed: boolean;
    progress: number;
    icon: string;
    completedDate: Date | null;
}

interface IAchievementsModal extends Model<IAchievements> { }

const schema = new Schema<IAchievements>({
    title: { type: String, index: true, required: true },
    total: { type: Number, index: true, required: true },
    description: { type: String, index: true, required: true },
    completed: { type: Boolean, index: true, required: true },
    progress: { type: Number, index: true, required: true },
    icon: { type: String, index: true, required: true },
    completedDate: { type: Date, index: true, required: false },
}, { timestamps: true });

const Goals: IAchievementsModal = model<IAchievements, IAchievementsModal>('Achievements', schema);

export default Goals;
