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
exports.loginSchema = void 0;
const joi_1 = __importDefault(require("joi"));
const request_middleware_1 = __importDefault(require("../../middleware/request-middleware"));
const User_1 = __importDefault(require("../../models/User"));
const bcrypt_1 = require("bcrypt");
const jsonwebtoken_1 = require("jsonwebtoken");
exports.loginSchema = joi_1.default.object().keys({
    email: joi_1.default.string().required(),
    password: joi_1.default.string().required()
});
const login = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _a, _b;
    const { email, password } = req.body;
    const user = yield User_1.default.findOne({ email });
    if (!user) {
        return res.status(400).send({
            error: 'Email or password is wrong'
        });
    }
    const validPassword = yield (0, bcrypt_1.compare)(password, user.password);
    if (!validPassword) {
        return res.status(400).send({
            error: 'Email or password is wrong'
        });
    }
    const token = (0, jsonwebtoken_1.sign)({ _id: user._id }, (_a = process.env.JWT_TOKEN_SECRET) !== null && _a !== void 0 ? _a : '', { expiresIn: '1h' });
    const refreshToken = (0, jsonwebtoken_1.sign)({ _id: user._id }, (_b = process.env.JWT_TOKEN_SECRET_REFRESH) !== null && _b !== void 0 ? _b : '', { expiresIn: '1d' });
    // const updatedUser = await User.findOneAndUpdate({ _id: user._id }, { refreshToken: refreshToken }, { new: true });
    // Include routine and routineTasks in the response
    const updatedUser = yield User_1.default.findOneAndUpdate({ _id: user._id }, { refreshToken: refreshToken }, { new: true })
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
    });
    res.send({
        message: 'Success',
        updatedUser: updatedUser === null || updatedUser === void 0 ? void 0 : updatedUser.toJSON(),
        token,
    });
});
exports.default = (0, request_middleware_1.default)(login, { validation: { body: exports.loginSchema } });
