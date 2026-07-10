import { Model, Schema, model, Document, Types } from 'mongoose';

// Interface pour un membre de la ligue
export interface LeagueMember {
    user: Types.ObjectId;  // Référence vers l'utilisateur
    score: number;         // Score du membre dans la ligue
    joinedAt: Date;        // Date d'ajout du membre à la ligue
}

export interface ILeagues extends Document {
    name: string;
    members: LeagueMember[];  // Liste d'objets pour les membres
    icon: string;
    resetDate: Date;
    level: number;
}

interface ILeaguesModel extends Model<ILeagues> { }

const leagueMemberSchema = new Schema<LeagueMember>({
    user: { type: Schema.Types.ObjectId, ref: 'User', required: true },
    score: { type: Number, required: true },
    joinedAt: { type: Date, default: Date.now }
});

const schema = new Schema<ILeagues>({
    name: { type: String, index: true, required: true },
    members: [leagueMemberSchema],  // Utilisation de la sous-structure pour les membres
    icon: { type: String, index: true, required: true },
    resetDate: { type: Date, index: true, required: true },
    level: { type: Number, index: true, required: true }
}, { timestamps: true });

const Leagues: ILeaguesModel = model<ILeagues, ILeaguesModel>('Leagues', schema);

export default Leagues;
