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
const node_cron_1 = __importDefault(require("node-cron"));
const User_1 = __importDefault(require("../models/User"));
const RoutineTasks_1 = __importDefault(require("../models/RoutineTasks"));
const dailyResetCron = () => __awaiter(void 0, void 0, void 0, function* () {
    node_cron_1.default.schedule('0 0 * * *', () => __awaiter(void 0, void 0, void 0, function* () {
        console.log('Running daily reset cron job');
        const users = yield User_1.default.find().populate('routine');
        for (const user of users) {
            if (user.routine) {
                // Reset all tasks to uncompleted
                yield RoutineTasks_1.default.updateMany({ _id: { $in: user.routine.tasks } }, { $set: { completed: false } });
                // Reset routine completion status
                user.routine.completed = false;
                user.routine.cheatDay = false;
                yield user.routine.save();
                console.log(`Reset routine for user: ${user._id}`);
            }
        }
    }));
});
exports.default = dailyResetCron;
