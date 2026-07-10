import { Request, RequestHandler } from 'express';
import Joi from 'joi';
import requestMiddleware from '../../middleware/request-middleware';
import User from '../../models/User';
import logger from '../../logger';
import bcrypt from 'bcrypt';
import { sign } from 'jsonwebtoken';

export const registerSchema = Joi.object().keys({
    name: Joi.string().required(),
    email: Joi.string().email().required(),
    password: Joi.string().min(6).required(),
});

interface RegisterReqBody {
    name: string;
    email: string;
    password: string;
}

const register: RequestHandler = async (req: Request<{}, {}, RegisterReqBody>, res) => {
    const { name, email, password } = req.body;

    // Check if the user already exists
    const EmailExist = await User.findOne({ email });
    if (EmailExist) {
        return res.status(400).send({
            error: 'Email already exists'
        });
    }

    // Hash the password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    // Derive a display handle from the email local-part (onboarding no longer
    // asks for a username). Suffix kept short to reduce collisions.
    const base = email.split('@')[0].replace(/[^a-zA-Z0-9_]/g, '') || 'user';
    const username = `${base}_${Math.random().toString(36).slice(2, 6)}`;

    // Create a new user with default values for required fields
    const user = new User({
        username,
        name,
        email,
        password: hashedPassword,
        refreshToken: '',
        streak: 0,
        currentLeague: 0,
        achievements: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        previousRoutineEnding: [],
        leagueScore: 83,
    });

    await user.save();

    // Generate JWT tokens
    const token = sign({ _id: user._id }, process.env.JWT_TOKEN_SECRET ?? '', { expiresIn: '1h' });
    const refreshToken = sign({ _id: user._id }, process.env.JWT_TOKEN_SECRET_REFRESH ?? '', { expiresIn: '1d' });

    // Update the user with the refresh token
    const updatedUser = await User.findOneAndUpdate({ _id: user._id }, { refreshToken: refreshToken }, { new: true });
    await updatedUser?.save();

    // Respond with success message and tokens
    res.send({
        message: 'Success',
        updatedUser: updatedUser?.toJSON(),
        token,
    });
};

export default requestMiddleware(register, { validation: { body: registerSchema } });
