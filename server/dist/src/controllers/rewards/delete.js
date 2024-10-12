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
const Rewards_1 = __importDefault(require("../../models/Rewards"));
const logger_1 = __importDefault(require("../../logger"));
const deleteRewards = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    const user = yield User_1.default.findOne({ _id: (_a = req === null || req === void 0 ? void 0 : req.user) === null || _a === void 0 ? void 0 : _a._id });
    if (!user) {
        return res.status(400).send({
            error: 'User not found'
        });
    }
    try {
        // Filter out the rewards to delete
        const rewardsToDelete = req.body.rewardIds;
        // Remove the rewards from the user's reward list
        user.rewards = user.rewards.filter((rewardId) => !rewardsToDelete.includes(rewardId.toString()));
        // Remove the rewards from the Rewards collection
        yield Rewards_1.default.deleteMany({ _id: { $in: rewardsToDelete } });
        // Save the updated user
        yield user.save();
        return res.send({
            message: 'Rewards successfully deleted'
        });
    }
    catch (error) {
        logger_1.default.error('Error deleting rewards: ', error);
        return res.status(500).send({
            error: 'An error occurred while deleting rewards'
        });
    }
});
exports.default = (0, auth_middleware_1.authMiddleware)((0, request_middleware_1.default)(deleteRewards));
