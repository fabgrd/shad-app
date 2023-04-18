import { Routine } from "../../types/Routine";

import Moment from "moment";

const MOCK_ROUTINE: Routine =
{
    id: 1,
    // Create a deadline 20hours from now using moment.js
    deadline: Moment().add(1, "hours").toDate(),
    completed: false,
    cheatDay: false,
    finished: null,
    tasks: [
        {
            id: 1,
            score: 1,
            title: "Run 20 minutes",
            completed: false,
        },
        {
            id: 2,
            score: 1,
            title: "Read",
            completed: false,
        },
        {
            id: 3,
            score: 1,
            title: "Meditate",
            completed: false,
        },
        {
            id: 4,
            score: 1,
            title: "Take care of family",
            completed: false,
        },
        {
            id: 5,
            score: 1,
            title: "Podcast",
            completed: false,
        }
    ]
}

export default MOCK_ROUTINE;