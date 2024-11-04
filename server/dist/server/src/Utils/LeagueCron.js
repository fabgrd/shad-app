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
const MOCK_USER_3 = require("../../../client/src/MOCK/Dashboard/MOCK_USER");
const mongoose_1 = __importDefault(require("mongoose"));
// Fonction pour générer les utilisateurs mockés
const generateMockUsers = (baseUser, count, leagueLevel) => {
    return Array.from({ length: count }, (_, i) => (Object.assign(Object.assign({}, baseUser), { _id: new mongoose_1.default.Types.ObjectId(), name: `${baseUser.name}_${i}`, email: `${baseUser.email.split('@')[0]}_${i}@test.com`, username: `${baseUser.username}_${i}`, currentLeague: leagueLevel, leagueScore: Math.floor(Math.random() * 100) })));
};
const leagueCron = () => __awaiter(void 0, void 0, void 0, function* () {
    node_cron_1.default.schedule('* * * * *', () => __awaiter(void 0, void 0, void 0, function* () {
        console.log('🕒 Starting league cron job...');
        try {
            const existingUsers = yield User_1.default.find();
            // Génération des utilisateurs mockés
            const mockUsers = [
                ...generateMockUsers(MOCK_USER_3.MOCK_USER_1, 10, 1),
                ...generateMockUsers(MOCK_USER_3.MOCK_USER_2, 10, 1),
            ];
            // Création des mock users s'ils n'existent pas
            yield User_1.default.insertMany(mockUsers);
            // Récupération de tous les utilisateurs
            const allUsers = yield User_1.default.find();
            console.log(`📊 Found ${allUsers.length} users total`);
            // Création du leaderboard
            const leaderboard = allUsers.map((user) => ({
                userId: user._id,
                name: user.name,
                leagueScore: user.leagueScore,
                currentLeague: user.currentLeague,
            }));
            // Tri des utilisateurs par score
            const sortedLeaderboard = leaderboard.sort((a, b) => b.leagueScore - a.leagueScore);
            const top10 = sortedLeaderboard.slice(0, 10);
            const bottom5 = sortedLeaderboard.slice(-5);
            // Promotion des 10 premiers utilisateurs
            yield Promise.all(top10.map((user) => __awaiter(void 0, void 0, void 0, function* () {
                const userToUpdate = yield User_1.default.findById(user.userId);
                if (userToUpdate) {
                    userToUpdate.currentLeague += 1;
                    userToUpdate.leagueScore = 0;
                    yield userToUpdate.save();
                    console.log(`✅ Promoted ${userToUpdate.name}`);
                }
            })));
            // Rétrogradation des 5 derniers utilisateurs
            yield Promise.all(bottom5.map((user) => __awaiter(void 0, void 0, void 0, function* () {
                const userToUpdate = yield User_1.default.findById(user.userId);
                if (userToUpdate && userToUpdate.currentLeague > 0) {
                    userToUpdate.currentLeague -= 1;
                    userToUpdate.leagueScore = 0;
                    yield userToUpdate.save();
                    console.log(`⬇️ Relegated ${userToUpdate.name}`);
                }
            })));
            console.log('✅ League cron job completed successfully');
        }
        catch (error) {
            console.error('❌ Error in league cron job:', error);
        }
    }));
});
exports.default = leagueCron;
