import {
    Model, Schema, model, Document
} from 'mongoose';

export interface IGoals extends Document {
    delay: Date;
    goal: string;
    user: string;
}

interface IGoalsModal extends Model<IGoals> { }

const schema = new Schema<IGoals>({
    delay: { type: Date, index: true, required: true },
    goal: { type: String, index: true, required: true },
    user: { type: String, index: true, required: true }
}, { timestamps: true });

const Goals: IGoalsModal = model<IGoals, IGoalsModal>('Goals', schema);

export default Goals;
