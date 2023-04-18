import {
    Model, Schema, model, Document
} from 'mongoose';

export interface IRewards extends Document {
    remainingDays: Date;
    title: string;
    user: string;
}

interface IRewardsModal extends Model<IRewards> { }

const schema = new Schema<IRewards>({
    remainingDays: { type: Date, index: true, required: true },
    title: { type: String, index: true, required: true },
    user: { type: String, index: true, required: true }
}, { timestamps: true });

const Rewards: IRewardsModal = model<IRewards, IRewardsModal>('Rewards', schema);

export default Rewards;
