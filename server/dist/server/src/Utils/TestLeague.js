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
exports.processLeaguePromotionsRelegations = exports.createMockLeagues = void 0;
const League_1 = __importDefault(require("../models/League"));
const User_1 = __importDefault(require("../models/User"));
const mongoose_1 = __importDefault(require("mongoose"));
const LEAGUE_NAMES = [
    "Worm",
    "Cockroach",
    "Fly",
    "Bee",
    "Bumblebee",
    "Beetle",
    "Mantis",
    "Butterfly"
];
// Fonction pour créer des utilisateurs mockés avec des scores aléatoires
function createMockUsers(leagueId, leagueLevel) {
    return __awaiter(this, void 0, void 0, function* () {
        const users = []; // Définition explicite du type
        for (let i = 0; i < 20; i++) {
            const user = yield User_1.default.create({
                name: `User ${leagueId}-${i + 1}`,
                email: `user${leagueId}${i + 1}@test.com`,
                password: 'password123',
                leagueScore: Math.floor(Math.random() * 100),
                currentLeague: leagueLevel,
                achievements: Array(14).fill(0),
                streak: Math.floor(Math.random() * 30),
                lastStreak: Math.floor(Math.random() * 10),
                lastStreakDate: new Date(),
                routine: [],
                goals: [],
                rewards: [],
            });
            users.push(user._id);
        }
        return users;
    });
}
// Fonction pour simuler la promotion/relégation
function processLeaguePromotionsRelegations() {
    return __awaiter(this, void 0, void 0, function* () {
        for (let leagueLevel = 0; leagueLevel < LEAGUE_NAMES.length; leagueLevel++) {
            const league = yield League_1.default.findOne({ level: leagueLevel });
            if (!league)
                continue;
            // Récupérer tous les utilisateurs de la ligue
            const users = yield User_1.default.find({ currentLeague: leagueLevel })
                .sort({ leagueScore: -1 });
            // Promotion des 10 premiers (sauf pour la dernière ligue)
            if (leagueLevel < LEAGUE_NAMES.length - 1) {
                const promotedUsers = users.slice(0, 10);
                for (const user of promotedUsers) {
                    user.currentLeague = leagueLevel + 1;
                    user.leagueScore = 0; // Reset score après promotion
                    yield user.save();
                }
            }
            // Relégation des 5 derniers (sauf pour la première ligue)
            if (leagueLevel > 0) {
                const relegatedUsers = users.slice(-5);
                for (const user of relegatedUsers) {
                    user.currentLeague = leagueLevel - 1;
                    user.leagueScore = 0; // Reset score après relégation
                    yield user.save();
                }
            }
        }
    });
}
exports.processLeaguePromotionsRelegations = processLeaguePromotionsRelegations;
// Fonction principale pour créer les ligues
function createMockLeagues() {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            yield League_1.default.deleteMany({});
            yield User_1.default.deleteMany({});
            const leagues = []; // Définition explicite du type
            for (let i = 0; i < LEAGUE_NAMES.length; i++) {
                const users = yield createMockUsers(LEAGUE_NAMES[i], i);
                const league = yield League_1.default.create({
                    name: LEAGUE_NAMES[i],
                    members: users,
                    icon: LEAGUE_NAMES[i].toLowerCase(),
                    level: i,
                    resetDate: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000),
                });
                leagues.push(league); // Cast explicite
            }
            console.log('Leagues created:', leagues);
            yield processLeaguePromotionsRelegations();
            console.log('Promotions and relegations processed');
        }
        catch (error) {
            console.error('Error in createMockLeagues:', error);
        }
    });
}
exports.createMockLeagues = createMockLeagues;
// Exécution si appelé directement
if (require.main === module) {
    mongoose_1.default.connect('mongodb+srv://shad_user:OAuWog0JvESB9I8a@shad.gjywb7d.mongodb.net/')
        .then(() => createMockLeagues())
        .then(() => {
        console.log('Mock leagues created successfully');
        process.exit(0);
    })
        .catch((error) => {
        console.error('Error:', error);
        process.exit(1);
    });
}
