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
exports.checkTaskSchema = void 0;
const joi_1 = __importDefault(require("joi"));
const request_middleware_1 = __importDefault(require("../../middleware/request-middleware"));
const auth_middleware_1 = require("../../middleware/auth-middleware");
const User_1 = __importDefault(require("../../models/User"));
const Routine_1 = __importDefault(require("../../models/Routine"));
exports.checkTaskSchema = joi_1.default.object().keys({
    completed: joi_1.default.boolean().required(),
    taskId: joi_1.default.string().required()
});
const checkTask = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _a, _b;
    const { completed, taskId } = req.body;
    console.log('completed', completed);
    console.log('taskId', taskId);
    const user = yield User_1.default.findOne({ _id: (_a = req === null || req === void 0 ? void 0 : req.user) === null || _a === void 0 ? void 0 : _a._id });
    console.log('req?.user?._id', (_b = req === null || req === void 0 ? void 0 : req.user) === null || _b === void 0 ? void 0 : _b._id);
    console.log('user', user);
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
    const userRoutine = yield Routine_1.default.findOne({ _id: user.routine });
    if (!userRoutine) {
        return res.status(400).send({
            error: 'Routine not found'
        });
    }
    const getRoutine = yield Routine_1.default.findOne({ _id: user.routine }).populate('tasks');
    if (!getRoutine) {
        return res.status(400).send({
            error: 'Routine not found'
        });
    }
    console.log('getRoutine', getRoutine);
    console.log('getRoutine.tasks', getRoutine.tasks);
    // task._id => _id: new ObjectId("640b08d81c1c216b3f488ac0"),
    const task = getRoutine.tasks.find((task) => task._id.toString() === taskId);
    if (!task) {
        return res.status(400).send({
            error: 'Task not found'
        });
    }
    // Check if all tasks are completed
    const allTasksCompleted = getRoutine.tasks.every((task) => task.completed);
    if (allTasksCompleted) {
        getRoutine.completed = allTasksCompleted;
        user.previousRoutineEnding.push(new Date());
        user.streak += 1;
        user.achievements[1] += 1;
        user.leagueScore += 10;
        yield getRoutine.save();
        yield user.save();
        return res.status(400).send({
            error: 'All tasks are completed'
        });
    }
    task.completed = completed;
    yield task.save();
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
exports.default = (0, auth_middleware_1.authMiddleware)((0, request_middleware_1.default)(checkTask, { validation: { body: exports.checkTaskSchema } }));
