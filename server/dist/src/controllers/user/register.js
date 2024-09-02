"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.registerSchema = void 0;
const joi_1 = __importDefault(require("joi"));
const request_middleware_1 = __importDefault(require("../../middleware/request-middleware"));
const User_1 = __importDefault(require("../../models/User"));
const bcrypt_1 = __importDefault(require("bcrypt"));
const jsonwebtoken_1 = require("jsonwebtoken");
exports.registerSchema = joi_1.default.object().keys({
    username: joi_1.default.string().required(),
    name: joi_1.default.string().required(),
    email: joi_1.default.string().required(),
    password: joi_1.default.string().required(),
    genre: joi_1.default.string().required(),
    birthDate: joi_1.default.string().required(),
});
const register = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _a, _b;
    const { username, name, email, password, genre, birthDate } = req.body;
    // Check if the user already exists
    const EmailExist = yield User_1.default.findOne({ email });
    if (EmailExist) {
        return res.status(400).send({
            error: 'Email already exists'
        });
    }
    // Hash the password
    const salt = yield bcrypt_1.default.genSalt(10);
    const hashedPassword = yield bcrypt_1.default.hash(password, salt);
    // Create a new user with default values for required fields
    const user = new User_1.default({
        username,
        name,
        email,
        password: hashedPassword,
        genre,
        birthDate,
        refreshToken: '',
        streak: 0,
        currentLeague: 0,
        achievements: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        previousRoutineEnding: [],
        leagueScore: 0, // Add leagueScore with a default value
    });
    yield user.save();
    // Generate JWT tokens
    const token = (0, jsonwebtoken_1.sign)({ _id: user._id }, (_a = process.env.JWT_TOKEN_SECRET) !== null && _a !== void 0 ? _a : '', { expiresIn: '1h' });
    const refreshToken = (0, jsonwebtoken_1.sign)({ _id: user._id }, (_b = process.env.JWT_TOKEN_SECRET_REFRESH) !== null && _b !== void 0 ? _b : '', { expiresIn: '1d' });
    // Update the user with the refresh token
    const updatedUser = yield User_1.default.findOneAndUpdate({ _id: user._id }, { refreshToken: refreshToken }, { new: true });
    yield (updatedUser === null || updatedUser === void 0 ? void 0 : updatedUser.save());
    // Respond with success message and tokens
    res.send({
        message: 'Success',
        updatedUser: updatedUser === null || updatedUser === void 0 ? void 0 : updatedUser.toJSON(),
        token,
    });
});
exports.default = (0, request_middleware_1.default)(register, { validation: { body: exports.registerSchema } });
