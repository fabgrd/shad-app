import { Request, RequestHandler } from 'express';
import Joi from 'joi';
import requestMiddleware from '../../middleware/request-middleware';
import { authMiddleware } from '../../middleware/auth-middleware';
import Routine from '../../models/Routine';
import User from '../../models/User';
import { log } from 'console';

// Schéma de validation pour la mise à jour du deadline
export const UpdateRoutineSchema = Joi.object().keys({
    deadline: Joi.date().iso().required(),
});

interface UpdateRoutineReqBody {
    deadline: Date; // Format ISO 8601
}

const updateRoutine: RequestHandler = async (req: Request<{}, {}, UpdateRoutineReqBody>, res) => {
    const { deadline } = req.body;

    try {
        // Trouver l'utilisateur actuel à partir du token
        const user = await User.findOne({ _id: req?.user?._id });
        if (!user) {
            return res.status(400).send({ error: 'User not found' });
        }

        // Trouver la routine associée à l'utilisateur
        const routine = await Routine.findOne({ _id: user.routine._id })
        if (!routine) {
            return res.status(404).send({ error: 'Routine not found' });
        }

        // Mettre à jour le deadline de la routine
        // Convertir la chaîne de date en objet Date
        const newDeadline = new Date(deadline);
        routine.deadline = newDeadline;
        console.log("NEW DEADLINE BEFORE DB: ", newDeadline);
        
        await routine.save();
        console.log('Updated routine in DB:', routine.deadline);

        // Récupérer la routine mise à jour depuis la base de données
        const updatedRoutine = await Routine.findById(routine._id);
        console.log('Fetched updated routine from DB:', updatedRoutine?.deadline);

        res.send({
            message: 'Deadline updated successfully',
            routine: updatedRoutine,
            updatedUser: user,
        });
    } catch (error) {
        console.error('Error in updateRoutine controller:', error);
        res.status(500).send({ error: 'Internal Server Error' });
    }
};

// Appliquer les middlewares d'authentification et de validation de schéma
export default authMiddleware(requestMiddleware(updateRoutine, { validation: { body: UpdateRoutineSchema } }));
