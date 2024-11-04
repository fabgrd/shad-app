"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const moment_1 = __importDefault(require("moment"));
const MOCK_TASKS = [
    {
        id: 1,
        title: "Run 20 minutes",
        score: 1,
        completed: false
    },
    {
        id: 2,
        title: "Read",
        score: 1,
        completed: false
    },
    {
        id: 3,
        title: "Meditate",
        score: 1,
        completed: false
    },
    {
        id: 4,
        title: "Take care of family",
        score: 1,
        completed: false
    },
    {
        id: 5,
        title: "Podcast",
        score: 1,
        completed: false
    }
];
const MOCK_ROUTINE = {
    id: 1,
    deadline: (0, moment_1.default)().add(1, "hours").toDate(),
    completed: false,
    cheatDay: false,
    finished: null,
    tasks: MOCK_TASKS
};
exports.default = MOCK_ROUTINE;
