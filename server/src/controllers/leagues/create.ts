import { Request, RequestHandler } from 'express';
import Joi from 'joi';
import Leagues from '../../models/Leagues';
import requestMiddleware from '../../middleware/request-middleware';
import { authMiddleware } from '../../middleware/auth-middleware';

// Schéma de validation pour la création d'une ligue
const createLeagueSchema = Joi.object({
    name: Joi.string().required(),
    icon: Joi.string().required(),
    resetDate: Joi.date().required(),
    level: Joi.number().required()
});

interface CreateLeagueReqBody {
    name: string;
    icon: string;
    resetDate: Date;
    level: number;
}

const createLeague: RequestHandler = async (req: Request<{}, {}, CreateLeagueReqBody>, res) => {
    const { name, icon, resetDate, level } = req.body;

    try {
        // Création de la ligue avec les données fournies
        const newLeague = new Leagues({
            name,
            icon,
            resetDate,
            level,
            members: []  // Initialise les membres comme un tableau vide
        });

        await newLeague.save();

        res.status(201).send({
            message: 'League created successfully',
            league: newLeague
        });
    } catch (error) {
        console.error('Error creating league:', error);
        res.status(500).send({
            error: 'Failed to create league'
        });
    }
};

export default requestMiddleware(createLeague, { validation: { body: createLeagueSchema } });
