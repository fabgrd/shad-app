import { Request, RequestHandler } from 'express';
import Joi from 'joi';
import requestMiddleware from '../../middleware/request-middleware';
import { authMiddleware } from '../../middleware/auth-middleware';
import Routine from '../../models/Routine';
import User from '../../models/User';
import { log } from 'console';

// Schéma de validation pour la mise à jour du deadline
export const UpdateRoutineSchema = Joi.object().keys({
    deadline: Joi.string().pattern(/^([0-1][0-9]|2[0-3]):([0-5][0-9])$/).required(), // Valider le format "HH:mm"
});

interface UpdateRoutineReqBody {
    deadline: string; // Format "HH:mm"
}

const updateRoutine: RequestHandler = async (req: Request<{}, {}, UpdateRoutineReqBody>, res) => {
    const { deadline } = req.body;

    try {
        // Trouver l'utilisateur actuel à partir du token
        const user = await User.findById(req.user?._id); // Utilise `findById` pour simplifier
        if (!user) {
            return res.status(400).send({ error: 'User not found' });
        }

        // Trouver la routine associée à l'utilisateur
        const routine = await Routine.findOne({ user: user._id });
        if (!routine) {
            return res.status(404).send({ error: 'Routine not found' });
        }

        // Mettre à jour le deadline de la routine
        routine.deadline = deadline; 
        console.log('Updated routine:', routine.deadline);
        await routine.save();

        res.send({
            message: 'Deadline updated successfully',
            routine,
        });
    } catch (error) {
        console.error('Error in updateRoutine controller:', error);
        res.status(500).send({ error: 'Internal Server Error' });
    }
};

// Appliquer les middlewares d'authentification et de validation de schéma
export default authMiddleware(requestMiddleware(updateRoutine, { validation: { body: UpdateRoutineSchema } }));
