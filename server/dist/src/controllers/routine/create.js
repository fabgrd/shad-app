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
exports.createSchema = void 0;
const joi_1 = __importDefault(require("joi"));
const request_middleware_1 = __importDefault(require("../../middleware/request-middleware"));
const auth_middleware_1 = require("../../middleware/auth-middleware");
const User_1 = __importDefault(require("../../models/User"));
const Routine_1 = __importDefault(require("../../models/Routine"));
const RoutineTasks_1 = __importDefault(require("../../models/RoutineTasks"));
// Schéma de validation
exports.createSchema = joi_1.default.object().keys({
    deadline: joi_1.default.string().pattern(/^([0-1][0-9]|2[0-3]):([0-5][0-9])$/).required(),
    completed: joi_1.default.boolean().required(),
    cheatDay: joi_1.default.boolean().required(),
    tasks: joi_1.default.array().items(joi_1.default.object({
        title: joi_1.default.string().required(),
        score: joi_1.default.number().required(),
        completed: joi_1.default.boolean().required()
    })).required()
});
const create = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _a, _b;
    const { deadline, completed, cheatDay, tasks } = req.body;
    console.log('Request body:', req.body);
    try {
        const user = yield User_1.default.findOne({ _id: (_a = req === null || req === void 0 ? void 0 : req.user) === null || _a === void 0 ? void 0 : _a._id });
        if (!user) {
            console.log('User not found:', (_b = req === null || req === void 0 ? void 0 : req.user) === null || _b === void 0 ? void 0 : _b._id);
            return res.status(400).send({ error: 'User not found' });
        }
        if (user.routine) {
            console.log('Deleting existing routine and tasks for user:', user._id);
            yield Routine_1.default.deleteOne({ _id: user.routine });
            yield RoutineTasks_1.default.deleteMany({ user: user._id });
        }
        const createTasksAsync = () => __awaiter(void 0, void 0, void 0, function* () {
            return Promise.all(tasks.map((task) => __awaiter(void 0, void 0, void 0, function* () {
                console.log('Creating task:', task);
                const routineTask = new RoutineTasks_1.default({
                    title: task.title,
                    score: task.score,
                    completed: task.completed,
                    user: user._id
                });
                const savedRoutineTask = yield routineTask.save();
                console.log('Saved task:', savedRoutineTask);
                return savedRoutineTask;
            })));
        });
        yield createTasksAsync();
        const allRoutineTasks = yield RoutineTasks_1.default.find({ user: user._id });
        console.log('All routine tasks for user:', allRoutineTasks);
        const selectAllTasksIdsAsync = () => __awaiter(void 0, void 0, void 0, function* () {
            return allRoutineTasks.map((task) => task === null || task === void 0 ? void 0 : task._id.toString());
        });
        // Création de la nouvelle routine
        const routine = new Routine_1.default({
            deadline,
            completed,
            cheatDay,
            tasks: yield selectAllTasksIdsAsync(),
            user: user._id
        });
        console.log('Creating new routine:', routine);
        const savedRoutine = yield routine.save();
        console.log('Saved routine:', savedRoutine);
        const getRoutine = yield Routine_1.default.findOne({ _id: savedRoutine._id }).populate('tasks');
        console.log('Fetched routine with populated tasks:', getRoutine);
        // Mise à jour de l'utilisateur avec la nouvelle routine
        yield User_1.default.findOneAndUpdate({ _id: user._id }, { routine: savedRoutine._id });
        console.log('Updated user with new routine:', user._id);
        res.send({
            message: 'Success',
            routine: getRoutine,
        });
    }
    catch (error) {
        console.error('Error creating routine:', error);
        res.status(500).send({ error: 'An error occurred while creating the routine' });
    }
});
exports.default = (0, auth_middleware_1.authMiddleware)((0, request_middleware_1.default)(create, { validation: { body: exports.createSchema } }));
