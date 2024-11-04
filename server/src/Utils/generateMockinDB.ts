import mongoose from 'mongoose';
import { MOCK_USER_1, MOCK_USER_2 } from '../MOCK/MOCK_USER';


// Fonction pour générer les utilisateurs mockés
const generateMockUsers = (baseUser: any, count: number, leagueLevel: number) => {
    return Array.from({ length: count }, (_, i) => ({
        _id: new mongoose.Types.ObjectId(),
        name: `${baseUser.name}_${i}`,
        email: `${baseUser.email.split('@')[0]}_${i}@test.com`,
        username: `${baseUser.username}_${i}`,
        password: baseUser.password,
        currentLeague: leagueLevel,
        leagueScore: Math.floor(Math.random() * 100),
        achievements: Array(14).fill(0),
        streak: 0,
        lastStreak: 0,
        lastStreakDate: new Date(),
        birthDate: baseUser.birthDate || new Date("1990-01-01"),  // Date de naissance par défaut
        genre: baseUser.genre || "non spécifié",  // Genre par défaut
        routine: new mongoose.Types.ObjectId(),
        goals: baseUser.goals,
        rewards: baseUser.rewards,
    }));
};
// Exemple d'utilisation (à supprimer ou commenter si non nécessaire)
const mockUsers = [
    ...generateMockUsers(MOCK_USER_1, 10, 0),
    ...generateMockUsers(MOCK_USER_2, 10, 0),
];

console.log(`Generated ${mockUsers.length} mock users for testing purposes.`);
export default generateMockUsers;
