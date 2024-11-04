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
exports.addRewardsSchema = void 0;
const joi_1 = __importDefault(require("joi"));
const request_middleware_1 = __importDefault(require("../../middleware/request-middleware"));
const auth_middleware_1 = require("../../middleware/auth-middleware");
const User_1 = __importDefault(require("../../models/User"));
const Rewards_1 = __importDefault(require("../../models/Rewards"));
// Schéma de validation pour l'ajout de récompenses
exports.addRewardsSchema = joi_1.default.object().keys({
    rewards: joi_1.default.array().items(joi_1.default.object({
        remainingDays: joi_1.default.date().required(),
        title: joi_1.default.string().required(),
    })).required()
});
const addRewards = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    console.log('addRewards called with body:', req.body);
    const { rewards } = req.body;
    // Trouve l'utilisateur connecté
    const user = yield User_1.default.findOne({ _id: (_a = req === null || req === void 0 ? void 0 : req.user) === null || _a === void 0 ? void 0 : _a._id });
    if (!user) {
        return res.status(400).send({
            error: 'User not found'
        });
    }
    // Crée les nouvelles récompenses et les associe à l'utilisateur
    const createRewardsAsync = () => __awaiter(void 0, void 0, void 0, function* () {
        return Promise.all(rewards.map((reward) => __awaiter(void 0, void 0, void 0, function* () {
            const newReward = new Rewards_1.default({
                remainingDays: reward.remainingDays,
                title: reward.title,
                user: user._id // Associer la récompense à l'utilisateur
            });
            user.rewards.push(newReward._id);
            yield newReward.save();
        })));
    });
    yield createRewardsAsync();
    yield user.save();
    try {
        const updatedUser = yield User_1.default.findById(user._id)
            .populate('goals')
            .populate('rewards')
            .populate('routine'); // Assurez-vous de peupler la routine également
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
exports.default = (0, auth_middleware_1.authMiddleware)((0, request_middleware_1.default)(addRewards, { validation: { body: exports.addRewardsSchema } }));
