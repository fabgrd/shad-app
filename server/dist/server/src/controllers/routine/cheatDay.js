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
const Routine_1 = __importDefault(require("../../models/Routine"));
const cheatDay = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    const user = yield User_1.default.findOne({ _id: (_a = req === null || req === void 0 ? void 0 : req.user) === null || _a === void 0 ? void 0 : _a._id });
    if (!user) {
        return res.status(400).send({
            error: 'User not found'
        });
    }
    if (!user.routine) {
        return res.status(400).send({
            error: 'Routine not found'
        });
    }
    const userRoutine = yield Routine_1.default.findOne({ _id: user.routine }).populate('tasks');
    if (!userRoutine) {
        return res.status(400).send({
            error: 'Routine not found'
        });
    }
    userRoutine.tasks.forEach((task) => {
        task.completed = true;
        user.leagueScore += 10;
        task.save();
    });
    userRoutine.cheatDay = true;
    userRoutine.completed = true;
    yield userRoutine.save();
    user.previousRoutineEnding.push(new Date());
    user.streak += 1;
    user.achievements[0] += 1;
    yield user.save();
    const updatedUser = yield User_1.default.findOneAndUpdate({ _id: user._id })
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
    });
});
exports.default = (0, auth_middleware_1.authMiddleware)((0, request_middleware_1.default)(cheatDay));
