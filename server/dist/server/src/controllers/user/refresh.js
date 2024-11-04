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
exports.refreshSchema = void 0;
const joi_1 = __importDefault(require("joi"));
const request_middleware_1 = __importDefault(require("../../middleware/request-middleware"));
const User_1 = __importDefault(require("../../models/User"));
const jsonwebtoken_1 = require("jsonwebtoken");
exports.refreshSchema = joi_1.default.object().keys({
    token: joi_1.default.string().required(),
    refreshToken: joi_1.default.string().required()
});
const refresh = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _a, _b, _c;
    const { token, refreshToken } = req.body;
    const user = yield User_1.default.findOne({ refreshToken });
    if (!user) {
        return res.status(400).send({
            error: 'Access token is wrong'
        });
    }
    const validToken = yield (0, jsonwebtoken_1.verify)(user.refreshToken, (_a = process.env.JWT_TOKEN_SECRET_REFRESH) !== null && _a !== void 0 ? _a : '');
    if (!validToken) {
        return res.status(400).send({
            error: 'Refresh token is wrong'
        });
    }
    const newToken = (0, jsonwebtoken_1.sign)({ _id: user._id }, (_b = process.env.JWT_TOKEN_SECRET) !== null && _b !== void 0 ? _b : '', { expiresIn: '1h' });
    const newRefreshToken = (0, jsonwebtoken_1.sign)({ _id: user._id }, (_c = process.env.JWT_TOKEN_SECRET_REFRESH) !== null && _c !== void 0 ? _c : '', { expiresIn: '1d' });
    const updatedUser = yield User_1.default.findOneAndUpdate({ _id: user._id }, { refreshToken: newRefreshToken }, { new: true });
    res.send({
        message: 'Success',
        token: newToken,
        refreshToken: newRefreshToken
    });
});
exports.default = (0, request_middleware_1.default)(refresh, { validation: { body: exports.refreshSchema } });
