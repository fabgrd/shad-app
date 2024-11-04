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
const node_cron_1 = __importDefault(require("node-cron"));
const User_1 = __importDefault(require("../models/User"));
const leagueCron = () => __awaiter(void 0, void 0, void 0, function* () {
    node_cron_1.default.schedule('* * * * *', () => __awaiter(void 0, void 0, void 0, function* () {
        try {
            const users = yield User_1.default.find();
            const leaderboard = users.map((user) => ({
                userId: user._id,
                leagueScore: user.leagueScore,
                currentLeague: user.currentLeague,
            }));
            // Trie les utilisateurs par score de ligue
            const sortedLeaderboard = leaderboard.sort((a, b) => b.leagueScore - a.leagueScore);
            const top10 = sortedLeaderboard.slice(0, 10);
            const bottom5 = sortedLeaderboard.slice(-5);
            // Promotion des 10 premiers utilisateurs
            yield Promise.all(top10.map((user) => __awaiter(void 0, void 0, void 0, function* () {
                const userToUpdate = yield User_1.default.findById(user.userId);
                if (userToUpdate) {
                    userToUpdate.currentLeague += 1; // Promotion de ligue
                    userToUpdate.leagueScore = 0; // Réinitialisation du score de ligue
                    yield userToUpdate.save();
                }
            })));
            // Rétrogradation des 5 derniers utilisateurs
            yield Promise.all(bottom5.map((user) => __awaiter(void 0, void 0, void 0, function* () {
                const userToUpdate = yield User_1.default.findById(user.userId);
                if (userToUpdate && userToUpdate.currentLeague > 0) {
                    userToUpdate.currentLeague -= 1; // Rétrogradation de ligue
                    yield userToUpdate.save();
                }
            })));
            console.log('Cron de ligue exécuté avec succès');
        }
        catch (error) {
            console.error('Erreur lors de l\'exécution du cron de ligue:', error);
        }
    }));
});
exports.default = leagueCron;
