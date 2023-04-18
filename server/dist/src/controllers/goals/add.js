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
const Goals_1 = __importDefault(require("../../models/Goals"));
const add = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    const user = yield User_1.default.findOne({ _id: (_a = req === null || req === void 0 ? void 0 : req.user) === null || _a === void 0 ? void 0 : _a._id });
    if (!user) {
        return res.status(400).send({
            error: 'User not found'
        });
    }
    const addGoalsAsync = () => __awaiter(void 0, void 0, void 0, function* () {
        return Promise.all(req.body.goals.map((goal) => __awaiter(void 0, void 0, void 0, function* () {
            const newGoal = new Goals_1.default({
                delay: goal.delay,
                goal: goal.goal,
                user: user._id
            });
            user.goals.push(newGoal._id);
            yield user.save();
            yield newGoal.save();
        })));
    });
    yield addGoalsAsync();
    return res.send({
        message: 'Success'
    });
});
exports.default = (0, auth_middleware_1.authMiddleware)((0, request_middleware_1.default)(add));
