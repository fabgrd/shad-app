import { Goal } from '../../types/Goal';

const MOCK_GOALS: Goal[] = [
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

export default MOCK_GOALS;