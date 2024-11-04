import { Reward } from '../../types/Reward';

const MOCK_REWARDS: Reward[] = [
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

export default MOCK_REWARDS;