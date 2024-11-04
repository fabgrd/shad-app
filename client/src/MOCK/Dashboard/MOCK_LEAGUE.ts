// Type
import type { League } from "../../types/League";

// MOCK USERS
import { MOCK_USER_1, MOCK_USER_2, MOCK_USER_3, MOCK_USER_4, MOCK_USER_5 } from "./MOCK_USER";

// Moment
import moment from "moment";

const generateLeagueMembers = () => {
    const allUsers = [MOCK_USER_1, MOCK_USER_2, MOCK_USER_3, MOCK_USER_4, MOCK_USER_5];
    let members = [];
    for (let i = 0; i < 20; i++) {
        // Selection aléatoire de l'utilisateur
        const randomUser = allUsers[Math.floor(Math.random() * allUsers.length)];
        members.push({ ...randomUser, id: `${randomUser.id}-${i}` }); // Ajout d'un id unique pour chaque utilisateur mock
    }
    return members;
};

const MOCK_LEAGUE: League[] = [
    {
        id: 1,
        name: "Worm",
        members: generateLeagueMembers(),
        icon: "worm",
        resetDate: moment().add(1, "days").toDate()
    },
    {
        id: 2,
        name: "Cockroach",
        members: generateLeagueMembers(),
        icon: "cockroach",
        resetDate: moment().add(1, "days").toDate()
    },
    {
        id: 3,
        name: "Fly",
        members: generateLeagueMembers(),
        icon: "fly",
        resetDate: moment().add(3, "days").toDate()
    },
    {
        id: 4,
        name: "Bee",
        members: generateLeagueMembers(),
        icon: "bee",
        resetDate: moment().add(1, "days").toDate()
    },
    {
        id: 5,
        name: "Bumblebee",
        members: generateLeagueMembers(),
        icon: "bumblebee",
        resetDate: moment().add(1, "days").toDate()
    },
    {
        id: 6,
        name: "Beetle",
        members: generateLeagueMembers(),
        icon: "beetle",
        resetDate: moment().add(1, "days").toDate()
    },
    {
        id: 7,
        name: "Mantis",
        members: generateLeagueMembers(),
        icon: "mantis",
        resetDate: moment().add(1, "days").toDate()
    },
    {
        id: 8,
        name: "Butterfly",
        members: generateLeagueMembers(),
        icon: "butterfly",
        resetDate: moment().add(1, "days").toDate()
    },
];

export default MOCK_LEAGUE;
