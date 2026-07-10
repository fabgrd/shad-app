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
const mongoose_1 = __importDefault(require("mongoose"));
const User_1 = __importDefault(require("../models/User"));
const Leagues_1 = __importDefault(require("../models/Leagues"));
const MOCK_USER_3 = require("../MOCK/MOCK_USER");
// Fonction pour générer les utilisateurs mockés
const generateMockUsers = (baseUser, count, leagueLevel) => {
    return Array.from({ length: count }, (_, i) => ({
        _id: new mongoose_1.default.Types.ObjectId(),
        name: `${baseUser.name}_${i}`,
        email: `${baseUser.email.split('@')[0]}_${i}@test.com`,
        username: `${baseUser.username}_${i}`,
        password: baseUser.password,
        currentLeague: leagueLevel,
        leagueScore: Math.floor(Math.random() * 100),
        achievements: Array(4).fill(0),
        streak: 0,
        lastStreak: 0,
        lastStreakDate: new Date(),
        birthDate: baseUser.birthDate || new Date("1990-01-01"),
        genre: baseUser.genre || "non spécifié",
        routine: new mongoose_1.default.Types.ObjectId(),
        goals: baseUser.goals,
        rewards: baseUser.rewards,
    }));
};
const ensureLeagueCapacity = (level, userId) => __awaiter(void 0, void 0, void 0, function* () {
    console.log(`🔍 Checking leagues at level ${level} for available space...`);
    // D'abord, vérifions si l'utilisateur est déjà dans une ligue de ce niveau
    const existingLeague = yield Leagues_1.default.findOne({
        level: level,
        members: userId
    });
    if (existingLeague) {
        console.log(`⚠️ User ${userId} is already in league ${existingLeague._id} at level ${level}`);
        return existingLeague;
    }
    // Chercher une ligue avec de la place
    const leagues = yield Leagues_1.default.find({ level }).sort({ createdAt: 1 });
    console.log(`📋 Found ${leagues.length} leagues at level ${level}`);
    // Chercher une ligue non pleine
    const availableLeague = leagues.find(league => league.members.length < 20);
    if (availableLeague) {
        console.log(`✅ Found available league ${availableLeague._id}`);
        return availableLeague;
    }
    // Créer une nouvelle ligue si nécessaire
    console.log(`🚀 Creating new league at level ${level}`);
    const newLeague = new Leagues_1.default({
        name: `League ${level} - ${leagues.length + 1}`,
        members: [],
        icon: "default_icon.png",
        resetDate: new Date(),
        level,
    });
    yield newLeague.save();
    return newLeague;
});
const processLeagues = () => __awaiter(void 0, void 0, void 0, function* () {
    try {
        console.log('🔄 Starting processLeagues...');
        let allUsers = yield User_1.default.find();
        console.log(`📊 Found ${allUsers.length} users in the database`);
        if (allUsers.length < 20) {
            console.log('⚠️ Not enough users in DB, adding mock users');
            const mockUsers = [
                ...generateMockUsers(MOCK_USER_3.MOCK_USER_1, 25, 0),
                ...generateMockUsers(MOCK_USER_3.MOCK_USER_2, 25, 0),
            ];
            yield User_1.default.insertMany(mockUsers);
            allUsers = yield User_1.default.find();
            console.log(`🎉 Added ${mockUsers.length} mock users to the database`);
        }
        yield Leagues_1.default.deleteMany({ members: { $size: 0 } });
        for (let level = 0; level <= 4; level++) {
            const usersInLeague = allUsers.filter(user => user.currentLeague === level);
            if (usersInLeague.length === 0)
                continue;
            console.log(`\n🏆 Processing League Level ${level} with ${usersInLeague.length} users`);
            const leaderboard = usersInLeague.map((user) => ({
                _id: user._id,
                name: user.name,
                leagueScore: user.leagueScore,
                currentLeague: user.currentLeague,
            }));
            const sortedLeaderboard = leaderboard.sort((a, b) => b.leagueScore - a.leagueScore);
            const top10 = sortedLeaderboard.slice(0, 10);
            const bottom5 = sortedLeaderboard.slice(-5);
            console.log(`\n🔼 Promoting top 10 users from League ${level}`);
            yield Promise.all(top10.map((user) => __awaiter(void 0, void 0, void 0, function* () {
                const userToUpdate = yield User_1.default.findById(user._id);
                if (userToUpdate && userToUpdate.currentLeague < 4) {
                    console.log(`⬆️ Promoting ${userToUpdate.name} from League ${userToUpdate.currentLeague}`);
                    userToUpdate.currentLeague += 1;
                    userToUpdate.leagueScore = 0;
                    // Remove user from previous league
                    const leagueToLeave = yield Leagues_1.default.findOne({ level: userToUpdate.currentLeague - 1 });
                    if (leagueToLeave) {
                        leagueToLeave.members = leagueToLeave.members.filter(memberId => memberId.toString() !== userToUpdate._id.toString());
                        yield leagueToLeave.save();
                    }
                    const league = yield ensureLeagueCapacity(userToUpdate.currentLeague, userToUpdate._id);
                    if (league) {
                        league.members.push(userToUpdate._id.toString());
                        yield league.save();
                    }
                    yield userToUpdate.save();
                    console.log(`✅ ${userToUpdate.name} promoted to League ${userToUpdate.currentLeague} (League ID: ${league._id})`);
                }
                else {
                    console.log(`ℹ️ ${userToUpdate ? userToUpdate.name : 'User'} is already at the highest league or not found`);
                }
                yield Leagues_1.default.deleteMany({ members: { $size: 0 } });
            })));
            console.log(`\n🔽 Relegating bottom 5 users from League ${level}`);
            yield Promise.all(bottom5.map((user) => __awaiter(void 0, void 0, void 0, function* () {
                const userToUpdate = yield User_1.default.findById(user._id);
                if (userToUpdate && userToUpdate.currentLeague > 0) {
                    console.log(`⬇️ Relegating ${userToUpdate.name} from League ${userToUpdate.currentLeague}`);
                    userToUpdate.currentLeague -= 1;
                    userToUpdate.leagueScore = 0;
                    // Remove user from previous league
                    const leagueToLeave = yield Leagues_1.default.findOne({ level: userToUpdate.currentLeague + 1 });
                    if (leagueToLeave) {
                        leagueToLeave.members = leagueToLeave.members.filter(memberId => memberId.toString() !== userToUpdate._id.toString());
                        yield leagueToLeave.save();
                    }
                    const league = yield ensureLeagueCapacity(userToUpdate.currentLeague, userToUpdate._id);
                    if (league) {
                        league.members.push(userToUpdate._id.toString());
                        yield league.save();
                    }
                    yield userToUpdate.save();
                    console.log(`✅ ${userToUpdate.name} relegated to League ${userToUpdate.currentLeague} (League ID: ${league._id})`);
                }
                else {
                    console.log(`ℹ️ ${userToUpdate ? userToUpdate.name : 'User'} is already at the lowest league or not found`);
                }
                yield Leagues_1.default.deleteMany({ members: { $size: 0 } });
            })));
        }
        console.log('✅ League cron job completed successfully');
    }
    catch (error) {
        console.error('❌ Error in league cron job:', error);
    }
});
const leagueCron = () => {
    node_cron_1.default.schedule('* * * * *', () => __awaiter(void 0, void 0, void 0, function* () {
        console.log('🕒 Starting league cron job...');
        yield processLeagues();
    }));
};
exports.default = leagueCron;
