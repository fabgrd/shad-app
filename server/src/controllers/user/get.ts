import { Request, RequestHandler } from 'express';
import Joi from 'joi';
import requestMiddleware from '../../middleware/request-middleware';
import { authMiddleware } from '../../middleware/auth-middleware';
import User from '../../models/User';
import logger from '../../logger';
import { compare } from 'bcrypt';
import { sign } from 'jsonwebtoken';

const getUser: RequestHandler = async (req: Request<{}, {}>, res) => {
    const userId = req?.user?._id;

    const token = sign({ _id: userId }, process.env.JWT_TOKEN_SECRET ?? '', { expiresIn: '1h' });
    const refreshToken = sign({ _id: userId }, process.env.JWT_TOKEN_SECRET_REFRESH ?? '', { expiresIn: '1d' });

    const updatedUser = await User.findOneAndUpdate({ _id: userId }, { refreshToken: refreshToken }, { new: true })
        .populate({
            path: 'routine',
            populate: {
                path: 'tasks',
                model: 'RoutineTasks'
            }
        })
        .populate({
            path: 'goals'
        })
        .populate({
            path: 'rewards'
        })

    console.log('updatedUser', updatedUser);
    res.send({
        message: 'Success test',
        updatedUser: updatedUser?.toJSON(),
        token,
    });
};

export default authMiddleware(requestMiddleware(getUser));