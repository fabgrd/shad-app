"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const schema = new mongoose_1.Schema({
    deadline: { type: Date, index: true, required: true },
    completed: { type: Boolean, index: true, required: true },
    cheatDay: { type: Boolean, index: true, required: true },
    finishedAt: { type: Date, index: true, required: false },
    tasks: [{ type: mongoose_1.Schema.Types.ObjectId, ref: 'RoutineTasks' }]
}, { timestamps: true });
const Routine = (0, mongoose_1.model)('Routine', schema);
exports.default = Routine;
