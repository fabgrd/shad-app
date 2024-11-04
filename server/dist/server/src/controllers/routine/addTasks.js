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
exports.addTasksSchema = void 0;
const joi_1 = __importDefault(require("joi"));
const request_middleware_1 = __importDefault(require("../../middleware/request-middleware"));
const auth_middleware_1 = require("../../middleware/auth-middleware");
const User_1 = __importDefault(require("../../models/User"));
const Routine_1 = __importDefault(require("../../models/Routine"));
const RoutineTasks_1 = __importDefault(require("../../models/RoutineTasks"));
exports.addTasksSchema = joi_1.default.object().keys({
    tasksToAdd: joi_1.default.array().items(joi_1.default.object({
        title: joi_1.default.string().required(),
        score: joi_1.default.number().required(),
        completed: joi_1.default.boolean().required()
    })).required()
});
const addTasks = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    const { tasksToAdd } = req.body;
    // Trouve l'utilisateur connecté
    const user = yield User_1.default.findOne({ _id: (_a = req === null || req === void 0 ? void 0 : req.user) === null || _a === void 0 ? void 0 : _a._id });
    if (!user) {
        return res.status(400).send({
            error: 'User not found'
        });
    }
    // Trouve la routine associée à l'utilisateur
    const routine = yield Routine_1.default.findOne({ _id: user.routine._id }).populate('tasks');
    if (!routine) {
        return res.status(400).send({
            error: 'Routine not found'
        });
    }
    // Crée les nouvelles tâches en les associant à la routine et à l'utilisateur
    const createTasksAsync = () => __awaiter(void 0, void 0, void 0, function* () {
        return Promise.all(tasksToAdd.map((task) => __awaiter(void 0, void 0, void 0, function* () {
            const routineTask = new RoutineTasks_1.default({
                title: task.title,
                score: task.score,
                completed: task.completed,
                user: user._id,
                routine: routine._id // Associer la tâche à la routine
            });
            return yield routineTask.save();
        })));
    });
    const newTasks = yield createTasksAsync();
    // Ajoute les nouvelles tâches à la routine en ajoutant leurs identifiants
    routine.tasks.push(...newTasks.map(task => task._id));
    yield routine.save();
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
    // // Récupère la routine mise à jour avec les nouvelles tâches
    // const updatedRoutine = await Routine.findOne({ _id: routine._id }).populate('tasks');
    // res.send({
    //     message: 'Tasks added successfully',
    //     routine: updatedRoutine,
    // });
});
exports.default = (0, auth_middleware_1.authMiddleware)((0, request_middleware_1.default)(addTasks, { validation: { body: exports.addTasksSchema } }));
