"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const MOCK_GOALS = [
    {
        _id: "1",
        goal: 'Cleaning my flat',
        remainingDays: 1,
        completed: false,
        createdAt: new Date().toISOString()
    },
    {
        _id: "2",
        goal: 'Finishing my thesis',
        remainingDays: 3,
        completed: false,
        createdAt: new Date().toISOString()
    },
    {
        _id: "3",
        goal: 'Pass my year with distinction',
        remainingDays: 120,
        completed: false,
        createdAt: new Date().toISOString()
    }
];
exports.default = MOCK_GOALS;
