import { Model, Schema, model, Document } from 'mongoose';

export interface ILeagues extends Document {
    name: string;
    members: string[];
    icon: string;
    resetDate: Date;
    level: number; // Ajout du niveau
}

interface ILeaguesModal extends Model<ILeagues> { }

const schema = new Schema<ILeagues>({
    name: { type: String, index: true, required: true },
    members: [{ type: String, index: true, required: true }],
    icon: { type: String, index: true, required: true },
    resetDate: { type: Date, index: true, required: true },
    level: { type: Number, index: true, required: true } // Nouveau champ
}, { timestamps: true });

const Leagues: ILeaguesModal = model<ILeagues, ILeaguesModal>('Leagues', schema);

export default Leagues;