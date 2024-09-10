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
    var _a;
    const { completed, taskId } = req.body;
    console.log('completed', completed);
    console.log('taskId', taskId);
    // Trouver l'utilisateur
    const user = yield User_1.default.findOne({ _id: (_a = req === null || req === void 0 ? void 0 : req.user) === null || _a === void 0 ? void 0 : _a._id });
    if (!user) {
        return res.status(400).send({
            error: 'User not found'
        });
    }
    // Trouver la routine de l'utilisateur
    const userRoutine = yield Routine_1.default.findOne({ _id: user.routine }).populate('tasks');
    if (!userRoutine) {
        return res.status(400).send({
            error: 'Routine not found'
        });
    }
    console.log('userRoutine', userRoutine);
    console.log('userRoutine.tasks', userRoutine.tasks);
    // Trouver la tâche à mettre à jour
    const task = userRoutine.tasks.find((task) => task._id.toString() === taskId);
    if (!task) {
        return res.status(400).send({
            error: 'Task not found'
        });
    }
    // Mettre à jour le statut de la tâche
    task.completed = completed;
    // Sauvegarder la tâche
    yield userRoutine.save();
    // Vérifier si toutes les tâches sont complètes
    const allTasksCompleted = userRoutine.tasks.every((task) => task.completed);
    if (allTasksCompleted) {
        userRoutine.completed = allTasksCompleted;
        // Mettre à jour l'utilisateur
        user.previousRoutineEnding.push(new Date());
        user.streak += 1;
        user.achievements[1] += 1;
        user.leagueScore += 10;
        yield user.save();
    }
    // Renvoi de la réponse avec les informations mises à jour
    const updatedUser = yield User_1.default.findOne({ _id: user._id })
        .populate({
        path: 'routine',
        populate: {
            path: 'tasks',
            model: 'RoutineTasks'
        }
    })
        .populate('goals')
        .populate('rewards');
    res.send({
        message: 'Success',
        updatedUser: updatedUser === null || updatedUser === void 0 ? void 0 : updatedUser.toJSON(),
    });
});
exports.default = (0, auth_middleware_1.authMiddleware)((0, request_middleware_1.default)(checkTask, { validation: { body: exports.checkTaskSchema } }));
