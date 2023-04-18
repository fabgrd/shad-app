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
exports.requestMiddleware = void 0;
const bad_request_1 = __importDefault(require("../errors/bad-request"));
const logger_1 = __importDefault(require("../logger"));
/**
 * Helper to get message from Joi
 * @param error Error form Joi
 * @returns Message from Joi, if available
 */
const getMessageFromJoiError = (error) => {
    if (!error.details && error.message) {
        return error.message;
    }
    return error.details && error.details.length > 0 && error.details[0].message
        ? `PATH: [${error.details[0].path}] ;; MESSAGE: ${error.details[0].message}` : undefined;
};
;
/**
 * This router wrapper catches any error from async await
 * and throws it to the default express error handler,
 * instead of crashing the app
 * @param handler Request handler to check for error
 */
const requestMiddleware = (handler, options) => (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    var _a, _b;
    if ((_a = options === null || options === void 0 ? void 0 : options.validation) === null || _a === void 0 ? void 0 : _a.body) {
        const { error } = (_b = options === null || options === void 0 ? void 0 : options.validation) === null || _b === void 0 ? void 0 : _b.body.validate(req.body);
        if (error != null) {
            next(new bad_request_1.default(getMessageFromJoiError(error)));
            return;
        }
    }
    try {
        handler(req, res, next);
    }
    catch (err) {
        if (process.env.NODE_ENV === 'development') {
            logger_1.default.log({
                level: 'error',
                message: 'Error in request handler',
                error: err
            });
        }
        next(err);
    }
    ;
});
exports.requestMiddleware = requestMiddleware;
exports.default = exports.requestMiddleware;
