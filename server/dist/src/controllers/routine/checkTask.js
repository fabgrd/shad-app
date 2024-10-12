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
const RoutineTasks_1 = __importDefault(require("../../models/RoutineTasks")); // Import du modèle RoutineTasks
exports.checkTaskSchema = joi_1.default.object().keys({
    completed: joi_1.default.boolean().required(),
    taskId: joi_1.default.string().required()
});
const checkTask = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    const { completed, taskId } = req.body;
    // Trouver l'utilisateur
    const user = yield User_1.default.findById((_a = req === null || req === void 0 ? void 0 : req.user) === null || _a === void 0 ? void 0 : _a._id);
    if (!user) {
        return res.status(400).send({
            error: 'User not found'
        });
    }
    // Trouver la routine de l'utilisateur
    const userRoutine = yield Routine_1.default.findById(user.routine).populate('tasks');
    if (!userRoutine) {
        return res.status(400).send({
            error: 'Routine not found'
        });
    }
    // Trouver la tâche à mettre à jour
    const task = yield RoutineTasks_1.default.findById(taskId);
    if (!task) {
        return res.status(400).send({
            error: 'Task not found'
        });
    }
    // Mettre à jour le statut de la tâche
    task.completed = completed;
    console.log(`%%%%%%%%%%%%%%% task ${taskId} completed:`, task.completed);
    // Sauvegarder la tâche
    try {
        yield task.save();
        console.log('Task saved successfully:', task);
    }
    catch (error) {
        console.error('Error saving task:', error);
        return res.status(500).send({
            error: 'Failed to save task'
        });
    }
    // Mettre à jour la routine selon l'état des tâches
    const allTasksCompleted = userRoutine.tasks.every((task) => task.completed);
    userRoutine.completed = allTasksCompleted;
    try {
        yield userRoutine.save(); // Sauvegarde de la routine, peu importe le statut des tâches
        console.log('Routine saved successfully with updated tasks:', userRoutine);
    }
    catch (error) {
        console.error('Error saving routine:', error);
        return res.status(500).send({
            error: 'Failed to save routine'
        });
    }
    // Mettre à jour l'utilisateur uniquement si la routine est complétée
    if (allTasksCompleted) {
        console.log('---------------------- All tasks completed, updating user routine details');
        user.previousRoutineEnding.push(new Date());
        user.streak += 1;
        user.achievements[1] += 1;
        user.leagueScore += 10;
    }
    // Renvoi de la réponse avec les informations mises à jour
    try {
        const updatedUser = yield User_1.default.findById(user._id)
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
    }
    catch (error) {
        console.error('Error fetching updated user:', error);
        res.status(500).send({
            error: 'Failed to retrieve updated user'
        });
    }
});
exports.default = (0, auth_middleware_1.authMiddleware)((0, request_middleware_1.default)(checkTask, { validation: { body: exports.checkTaskSchema } }));
