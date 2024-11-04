import mongoose from 'mongoose';
import MOCK_ROUTINE from "./MOCK_ROUTINE";
import MOCK_GOALS from "./MOCK_GOALS";
import MOCK_REWARDS from "./MOCK_REWARDS";

export const MOCK_USER_1 = {
    _id: new mongoose.Types.ObjectId(),
    name: "John Doe",
    email: "john@test.com",
    username: "johndoe",
    password: "$2b$10$EXAMPLEHASH123456", // Exemple de mot de passe haché
    genre: "masculin",
    birthDate: new Date("1990-01-01"),
    streak: 1,
    currentLeague: 0,
    achievements: Array(14).fill(0),
    refreshToken: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.ExampleToken123456",
    previousRoutineEnding: [new Date("2023-11-02T10:00:00Z")],
    leagueScore: Math.floor(Math.random() * 100),
    goals: [new mongoose.Types.ObjectId()],
    rewards: [new mongoose.Types.ObjectId()],
    followers: [],
    following: [],
    createdAt: new Date(),
    updatedAt: new Date(),
    routine: new mongoose.Types.ObjectId()
};

export const MOCK_USER_2 = {
    _id: new mongoose.Types.ObjectId(),
    name: "Jane Smith",
    email: "jane@test.com",
    username: "janesmith",
    password: "$2b$10$EXAMPLEHASH654321", // Exemple de mot de passe haché
    genre: "féminin",
    birthDate: new Date("1992-05-15"),
    streak: 2,
    currentLeague: 0,
    achievements: Array(14).fill(0),
    refreshToken: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.ExampleToken654321",
    previousRoutineEnding: [new Date("2023-11-02T10:00:00Z")],
    leagueScore: Math.floor(Math.random() * 100),
    goals: [new mongoose.Types.ObjectId()],
    rewards: [new mongoose.Types.ObjectId()],
    followers: [],
    following: [],
    createdAt: new Date(),
    updatedAt: new Date(),
    routine: new mongoose.Types.ObjectId()
};
