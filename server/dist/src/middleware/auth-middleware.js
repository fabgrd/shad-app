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
Object.defineProperty(exports, "__esModule", { value: true });
exports.authMiddleware = void 0;
const jsonwebtoken_1 = require("jsonwebtoken");
;
const authMiddleware = (handler, options) => (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    var _a, _b;
    const token = req.header('x-auth-token');
    console.log('Token received:', token);
    if (!token) {
        return res.status(401).send('Access Denied');
    }
    try {
        const verified = (0, jsonwebtoken_1.verify)(token, (_a = process.env.JWT_TOKEN_SECRET) !== null && _a !== void 0 ? _a : '');
        console.log('Verified payload:', verified);
        req.user = verified;
        console.log('User attached to request:', req.user);
        if ((_b = options === null || options === void 0 ? void 0 : options.validation) === null || _b === void 0 ? void 0 : _b.body) {
            const { error } = options.validation.body.validate(req.body);
            if (error) {
                console.log('Validation error:', error.details[0].message);
                return res.status(400).send(error.details[0].message);
            }
        }
        return handler(req, res, next);
    }
    catch (err) {
        console.error('Token verification error:', err);
        res.status(400).send('Invalid Token');
    }
});
exports.authMiddleware = authMiddleware;
