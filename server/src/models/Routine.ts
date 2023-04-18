import {
    Model, Schema, model, Document
} from 'mongoose';

import { IRoutineTasks } from './RoutineTasks';

export interface IRoutine extends Document {
    deadline: Date;
    completed: boolean;
    cheatDay: boolean;
    finishedAt: Date | null;
    tasks: IRoutineTasks[];
    createdAt: Date;
    updatedAt: Date;
}

interface IRoutineModal extends Model<IRoutine> { }

const schema = new Schema<IRoutine>({
    deadline: { type: Date, index: true, required: true },
    completed: { type: Boolean, index: true, required: true },
    cheatDay: { type: Boolean, index: true, required: true },
    finishedAt: { type: Date, index: true, required: false },
    tasks: [{ type: Schema.Types.ObjectId, ref: 'RoutineTasks' }]
}, { timestamps: true });

const Routine: IRoutineModal = model<IRoutine, IRoutineModal>('Routine', schema);

export default Routine;
