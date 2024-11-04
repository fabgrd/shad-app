"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const application_error_1 = __importDefault(require("./application-error"));
class BadRequest extends application_error_1.default {
    constructor(message) {
        super(message || 'Bad request', 400);
    }
}
exports.default = BadRequest;
