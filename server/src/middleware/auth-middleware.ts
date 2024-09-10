
import { Request, Response, NextFunction, RequestHandler } from 'express';
import { verify } from 'jsonwebtoken';
import { IUser } from '../models/User';
import Joi from 'joi';

declare global {
    namespace Express {
        interface Request {
            user?: IUser;
        }
    }
}

interface HandlerOptions {
    validation?: {
        body?: Joi.ObjectSchema
    }
};

export const authMiddleware = (
    handler: RequestHandler,
    options?: HandlerOptions,
): RequestHandler => async (req: Request, res: Response, next: NextFunction) => {
    
    const token = req.header('x-auth-token');
    console.log('Token received:', token);

    if (!token) {
        return res.status(401).send('Access Denied');
    }

    try {
        const verified = verify(token, process.env.JWT_TOKEN_SECRET ?? '');
        console.log('Verified payload:', verified);

        req.user = verified as IUser;
        console.log('User attached to request:', req.user);

        if (options?.validation?.body) {
            const { error } = options.validation.body.validate(req.body);
            if (error) {
                console.log('Validation error:', error.details[0].message);
                return res.status(400).send(error.details[0].message);
            }
        }

        return handler(req, res, next);
    } catch (err) {
        console.error('Token verification error:', err);
        res.status(400).send('Invalid Token');
    }
}

