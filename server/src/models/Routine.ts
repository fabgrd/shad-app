import {
    Model, Schema, model, Document
} from 'mongoose';

import { IRoutineTasks } from './RoutineTasks';

// Mise à jour de l'interface IRoutine pour utiliser String pour deadline
export interface IRoutine extends Document {
    deadline: string; // Changement du type en string
    completed: boolean;
    cheatDay: boolean;
    finishedAt: Date | null;
    tasks: IRoutineTasks[];
    createdAt: Date;
    updatedAt: Date;
}

interface IRoutineModal extends Model<IRoutine> { }

const schema = new Schema<IRoutine>({
    deadline: { type: String, index: true, required: true }, // Changement du type en String
    completed: { type: Boolean, index: true, required: true },
    cheatDay: { type: Boolean, index: true, required: true },
    finishedAt: { type: Date, index: true, required: false },
    tasks: [{ type: Schema.Types.ObjectId, ref: 'RoutineTasks' }]
}, { timestamps: true });

const Routine: IRoutineModal = model<IRoutine, IRoutineModal>('Routine', schema);

export default Routine;
