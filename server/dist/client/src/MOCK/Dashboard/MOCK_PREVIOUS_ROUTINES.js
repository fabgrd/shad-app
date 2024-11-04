"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
// moment
const moment_1 = __importDefault(require("moment"));
const MOCK_PREVIOUS_ROUTINES = [
    {
        id: 2,
        // Create a deadline 1 day ago at 7pm using moment.js
        deadline: (0, moment_1.default)().subtract(1, "days").set('hour', 23).toDate(),
        completed: false,
        cheatDay: false,
        finished: (0, moment_1.default)().subtract(1, "days").set('hour', 17).toDate(),
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
    },
    {
        id: 3,
        // Create a deadline 20hours from now using moment.js
        deadline: (0, moment_1.default)().subtract(2, "days").set('hour', 22).toDate(),
        completed: true,
        cheatDay: false,
        finished: (0, moment_1.default)().subtract(2, "days").set('hour', 19).toDate(),
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
    },
    {
        id: 4,
        // Create a deadline 20hours from now using moment.js
        deadline: (0, moment_1.default)().subtract(3, "days").set('hour', 21).toDate(),
        completed: true,
        cheatDay: false,
        finished: (0, moment_1.default)().subtract(3, "days").set('hour', 20).toDate(),
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
    },
    {
        id: 5,
        // Create a deadline 20hours from now using moment.js
        deadline: (0, moment_1.default)().subtract(4, "days").set('hour', 23).toDate(),
        completed: true,
        cheatDay: false,
        finished: (0, moment_1.default)().subtract(4, "days").set('hour', 22).toDate(),
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
    },
    {
        id: 6,
        // Create a deadline 20hours from now using moment.js
        deadline: (0, moment_1.default)().subtract(5, "days").set('hour', 21).toDate(),
        completed: true,
        cheatDay: false,
        finished: (0, moment_1.default)().subtract(5, "days").set('hour', 16).toDate(),
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
];
exports.default = MOCK_PREVIOUS_ROUTINES;
