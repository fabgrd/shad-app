"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteGoals = exports.get = exports.add = void 0;
const add_1 = __importDefault(require("./add"));
exports.add = add_1.default;
const get_1 = __importDefault(require("./get"));
exports.get = get_1.default;
const delete_1 = __importDefault(require("./delete"));
exports.deleteGoals = delete_1.default;
