"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const MOCK_REWARDS = [
    {
        _id: "1",
        title: 'New shoes',
        remainingDays: 2,
        completed: false,
        createdAt: new Date().toISOString()
    },
    {
        _id: "2",
        title: 'My tatoo project',
        remainingDays: 72,
        completed: false,
        createdAt: new Date().toISOString()
    },
    {
        _id: "3",
        title: 'Trip to Groenland',
        remainingDays: 337,
        completed: false,
        createdAt: new Date().toISOString()
    }
];
exports.default = MOCK_REWARDS;
