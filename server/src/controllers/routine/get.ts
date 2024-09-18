import { Request, RequestHandler } from 'express';
import Joi from 'joi';
import requestMiddleware from '../../middleware/request-middleware';
import { authMiddleware } from '../../middleware/auth-middleware';
import User from '../../models/User';
import Routine from '../../models/Routine';
import RoutineTasks from '../../models/RoutineTasks';

const get: RequestHandler = async (req, res) => {

    const user = await User.findOne({ _id: req?.user?._id });

    if (!user) {
        return res.status(400).send({
            error: 'User not found'
        });
    }

    const routine = await Routine.find({ user: user?._id });

    res.send({
        message: 'Success',
        routine
    });
}

export default authMiddleware(requestMiddleware(get));
