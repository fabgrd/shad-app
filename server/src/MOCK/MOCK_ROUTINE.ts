import mongoose from 'mongoose';

const MOCK_TASKS = [
    {
        _id: new mongoose.Types.ObjectId(),
        title: "Run 20 minutes",
        score: 1,
        completed: false,
        user: new mongoose.Types.ObjectId(),
        routine: new mongoose.Types.ObjectId()
    },
    {
        _id: new mongoose.Types.ObjectId(),
        title: "Read",
        score: 1,
        completed: false,
        user: new mongoose.Types.ObjectId(),
        routine: new mongoose.Types.ObjectId()
    }
];

const MOCK_ROUTINE = {
    _id: new mongoose.Types.ObjectId(),
    deadline: moment().add(1, "hours").toDate(),
    completed: false,
    cheatDay: false,
    finishedAt: null,
    tasks: MOCK_TASKS.map(task => task._id),
    createdAt: new Date(),
    updatedAt: new Date()
};

export default MOCK_ROUTINE;