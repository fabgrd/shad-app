import { Request, RequestHandler } from 'express';
import Joi from 'joi';
import requestMiddleware from '../../middleware/request-middleware';
import User from '../../models/User';
import logger from '../../logger';
import { verify, sign } from 'jsonwebtoken';

export const refreshSchema = Joi.object().keys({
    token: Joi.string().required(),
    refreshToken: Joi.string().required()
});

interface refreshReqBody {
    token: string;
    refreshToken: string;
}

const refresh: RequestHandler = async (req: Request<{}, {}, refreshReqBody>, res) => {

    const { token, refreshToken } = req.body;

    const user = await User.findOne({ refreshToken });

    if (!user) {
        return res.status(400).send({
            error: 'Access token is wrong'
        });
    }

    const validToken = await verify(user.refreshToken, process.env.JWT_TOKEN_SECRET_REFRESH ?? '');

    if (!validToken) {
        return res.status(400).send({
            error: 'Refresh token is wrong'
        });
    }

    const newToken = sign({ _id: user._id }, process.env.JWT_TOKEN_SECRET ?? '', { expiresIn: '1h' }); 
    const newRefreshToken = sign({ _id: user._id }, process.env.JWT_TOKEN_SECRET_REFRESH ?? '', { expiresIn: '1d' });

    const updatedUser = await User.findOneAndUpdate({ _id: user._id }, { refreshToken: newRefreshToken }, { new: true });

    res.send({
        message: 'Success',
        token: newToken,
        refreshToken: newRefreshToken
    });
}

export default requestMiddleware(refresh, { validation: { body: refreshSchema } });