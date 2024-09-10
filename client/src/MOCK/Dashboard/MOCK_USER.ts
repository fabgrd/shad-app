import type { User } from "../../types/User";
import MOCK_ROUTINE from "./MOCK_ROUTINE";
import MOCK_GOALS from "./MOCK_GOALS";
import MOCK_REWARDS from "./MOCK_REWARDS";
import MOCK_ACHIEVEMENTS from "./MOCK_ACHIEVEMENTS";
import MOCK_PREVIOUS_ROUTINES from "./MOCK_PREVIOUS_ROUTINES";


const MOCK_USER: User = {
    // User Info
    id: "1",
    name: "John Doe",
    username: "TheDoe",
    email: "john@gmail.com",
    photo: "https://i.pravatar.cc/150?img=1",
    createdAt: new Date(),
    // Followers & Following
    followers: [""],
    following: [""],
    // Ligues
    currentLeague: 0,
    leagueScore: 12,
    // Achievements
    achievements: [1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    // Streak
    streak: 12,
    lastStreak: 0,
    lastStreakDate: new Date().toISOString(),
    routine: MOCK_ROUTINE,
    previousRoutineEnding: MOCK_PREVIOUS_ROUTINES,
    goals: MOCK_GOALS,
    rewards: MOCK_REWARDS,
    
}

export default MOCK_USER;