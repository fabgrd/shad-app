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
const request_middleware_1 = __importDefault(require("../../middleware/request-middleware"));
const auth_middleware_1 = require("../../middleware/auth-middleware");
const User_1 = __importDefault(require("../../models/User"));
const jsonwebtoken_1 = require("jsonwebtoken");
const getUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _a, _b, _c;
    const userId = (_a = req === null || req === void 0 ? void 0 : req.user) === null || _a === void 0 ? void 0 : _a._id;
    const token = (0, jsonwebtoken_1.sign)({ _id: userId }, (_b = process.env.JWT_TOKEN_SECRET) !== null && _b !== void 0 ? _b : '', { expiresIn: '1h' });
    const refreshToken = (0, jsonwebtoken_1.sign)({ _id: userId }, (_c = process.env.JWT_TOKEN_SECRET_REFRESH) !== null && _c !== void 0 ? _c : '', { expiresIn: '1d' });
    const updatedUser = yield User_1.default.findOneAndUpdate({ _id: userId }, { refreshToken: refreshToken }, { new: true })
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
    console.log('updatedUser', updatedUser);
    res.send({
        message: 'Success test',
        updatedUser: updatedUser === null || updatedUser === void 0 ? void 0 : updatedUser.toJSON(),
        token,
    });
});
exports.default = (0, auth_middleware_1.authMiddleware)((0, request_middleware_1.default)(getUser));
