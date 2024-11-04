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
exports.addGoalsSchema = void 0;
const joi_1 = __importDefault(require("joi"));
const request_middleware_1 = __importDefault(require("../../middleware/request-middleware"));
const auth_middleware_1 = require("../../middleware/auth-middleware");
const User_1 = __importDefault(require("../../models/User"));
const Goals_1 = __importDefault(require("../../models/Goals"));
exports.addGoalsSchema = joi_1.default.object().keys({
    goals: joi_1.default.array().items(joi_1.default.object({
        remainingDays: joi_1.default.date().required(),
        goal: joi_1.default.string().required(),
    })).required()
});
const addGoals = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    console.log('addGoals called with body:', req.body);
    const { goals } = req.body;
    const user = yield User_1.default.findOne({ _id: (_a = req === null || req === void 0 ? void 0 : req.user) === null || _a === void 0 ? void 0 : _a._id });
    if (!user) {
        return res.status(400).send({
            error: 'User not found'
        });
    }
    const createGoalsAsync = () => __awaiter(void 0, void 0, void 0, function* () {
        return Promise.all(goals.map((goal) => __awaiter(void 0, void 0, void 0, function* () {
            const newGoal = new Goals_1.default({
                remainingDays: goal.remainingDays,
                goal: goal.goal,
                user: user._id
            });
            user.goals.push(newGoal._id);
            yield newGoal.save();
        })));
    });
    yield createGoalsAsync();
    yield user.save();
    try {
        const updatedUser = yield User_1.default.findById(user._id)
            .populate('goals')
            .populate('rewards')
            .populate('routine');
        console.log('Updated user:', updatedUser);
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
exports.default = (0, auth_middleware_1.authMiddleware)((0, request_middleware_1.default)(addGoals));
