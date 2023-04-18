// Type
import type { League } from "../../types/League";

// MOCK USER
import MOCK_USER from "./MOCK_USER";

// Moment
import moment from "moment";

const MOCK_LEAGUE: League[] = [
    {
        id: 1,
        name: "Tiger",
        members: [MOCK_USER, MOCK_USER],
        icon: "tiger",
        resetDate: moment().add(1, "days").toDate()
    },
    {
        id: 2,
        name: "Lion",
        members: [MOCK_USER, MOCK_USER, MOCK_USER],
        icon: "lion",
        resetDate: moment().add(3, "days").toDate()
    },
    {
        id: 3,
        name: "Bear",
        members: [MOCK_USER],
        icon: "bear",
        resetDate: moment().add(1, "days").toDate()
    },
    {
        id: 4,
        name: "Wolf",
        members: [MOCK_USER],
        icon: "wolf",
        resetDate: moment().add(1, "days").toDate()
    },
    {
        id: 5,
        name: "Fox",
        members: [MOCK_USER],
        icon: "fox",
        resetDate: moment().add(1, "days").toDate()
    },
    {
        id: 6,
        name: "Panda",
        members: [MOCK_USER],
        icon: "panda",
        resetDate: moment().add(1, "days").toDate()
    },
    {
        id: 7,
        name: "Elephant",
        members: [MOCK_USER],
        icon: "elephant",
        resetDate: moment().add(1, "days").toDate()
    },
    {
        id: 8,
        name: "Horse",
        members: [MOCK_USER],
        icon: "horse",
        resetDate: moment().add(1, "days").toDate()
    }
]

export default MOCK_LEAGUE;