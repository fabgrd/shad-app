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
exports.removeTasksSchema = void 0;
const joi_1 = __importDefault(require("joi"));
const request_middleware_1 = __importDefault(require("../../middleware/request-middleware"));
const auth_middleware_1 = require("../../middleware/auth-middleware");
const User_1 = __importDefault(require("../../models/User"));
const Routine_1 = __importDefault(require("../../models/Routine"));
const RoutineTasks_1 = __importDefault(require("../../models/RoutineTasks"));
exports.removeTasksSchema = joi_1.default.object().keys({
    tasksToRemove: joi_1.default.array().items(joi_1.default.string()).required() // Array of task IDs to remove
});
const removeTasks = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    const { tasksToRemove } = req.body;
    console.log('Tasks to remove:', tasksToRemove); // Ajoutez cette ligne pour vérifier les IDs des tâches à supprimer
    try {
        const user = yield User_1.default.findOne({ _id: (_a = req === null || req === void 0 ? void 0 : req.user) === null || _a === void 0 ? void 0 : _a._id });
        if (!user) {
            return res.status(400).send({ error: 'User not found' });
        }
        const routine = yield Routine_1.default.findOne({ user: user._id }).populate('tasks');
        if (!routine) {
            return res.status(400).send({ error: 'Routine not found' });
        }
        if (tasksToRemove.length > 0) {
            yield RoutineTasks_1.default.deleteMany({ _id: { $in: tasksToRemove } });
            routine.tasks = routine.tasks.filter(task => !tasksToRemove.includes(task._id.toString()));
            yield routine.save();
        }
        const updatedRoutine = yield Routine_1.default.findOne({ _id: routine._id }).populate('tasks');
        res.send({
            message: 'Tasks removed successfully',
            routine: updatedRoutine,
        });
    }
    catch (error) {
        console.error('Error in removeTasks controller:', error);
        res.status(500).send({ error: 'Internal Server Error' });
    }
});
exports.default = (0, auth_middleware_1.authMiddleware)((0, request_middleware_1.default)(removeTasks, { validation: { body: exports.removeTasksSchema } }));
