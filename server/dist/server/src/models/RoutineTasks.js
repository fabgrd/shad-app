"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const schema = new mongoose_1.Schema({
    title: { type: String, index: true, required: true },
    score: { type: Number, index: true, required: true },
    user: { type: String, index: true, required: true },
    // routine: { type: String, index: true, required: true },
    completed: { type: Boolean, index: true, required: true }
}, { timestamps: true });
const RoutineTasks = (0, mongoose_1.model)('RoutineTasks', schema);
exports.default = RoutineTasks;
