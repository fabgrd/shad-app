import { Request, RequestHandler } from 'express';
import Joi from 'joi';
import requestMiddleware from '../../middleware/request-middleware';
import User from '../../models/User';
import logger from '../../logger';
import { compare } from 'bcrypt';
import { sign } from 'jsonwebtoken';

export const loginSchema = Joi.object().keys({
    email: Joi.string().required(),
    password: Joi.string().required()
});

interface LoginReqBody {
    email: string;
    password: string;
}

const login: RequestHandler = async (req: Request<{}, {}, LoginReqBody>, res) => {
    const { email, password } = req.body;

    const user = await User.findOne({ email });

    if (!user) {
        return res.status(400).send({
            error: 'Email or password is wrong'
        });
    }

    const validPassword = await compare(password, user.password);

    if (!validPassword) {
        return res.status(400).send({
            error: 'Email or password is wrong'
        });
    }

    const token = sign({ _id: user._id }, process.env.JWT_TOKEN_SECRET ?? '', { expiresIn: '1h' });
    const refreshToken = sign({ _id: user._id }, process.env.JWT_TOKEN_SECRET_REFRESH ?? '', { expiresIn: '1d' });

    // const updatedUser = await User.findOneAndUpdate({ _id: user._id }, { refreshToken: refreshToken }, { new: true });
    // Include routine and routineTasks in the response
    const updatedUser = await User.findOneAndUpdate({ _id: user._id }, { refreshToken: refreshToken }, { new: true })
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

    res.send({
        message: 'Success',
        updatedUser: updatedUser?.toJSON(),
        token,
    });
};

export default requestMiddleware(login, { validation: { body: loginSchema } });