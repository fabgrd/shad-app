import {
    Model, Schema, model, Document
} from 'mongoose';

export interface IRoutineTasks extends Document {
    /** Name of the user */
    id: number;
    title: string;
    score: number;
    completed: boolean;
    user: string;
    createdAt: Date;
    updatedAt: Date;
}

interface IRoutineTasksModal extends Model<IRoutineTasks> { }

const schema = new Schema<IRoutineTasks>({
    title: { type: String, index: true, required: true },
    score: { type: Number, index: true, required: true },
    user: { type: String, index: true, required: true },
    completed: { type: Boolean, index: true, required: true }
}, { timestamps: true });

const RoutineTasks: IRoutineTasksModal = model<IRoutineTasks, IRoutineTasksModal>('RoutineTasks', schema);

export default RoutineTasks
