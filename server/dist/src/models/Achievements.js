"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const schema = new mongoose_1.Schema({
    title: { type: String, index: true, required: true },
    total: { type: Number, index: true, required: true },
    description: { type: String, index: true, required: true },
    completed: { type: Boolean, index: true, required: true },
    progress: { type: Number, index: true, required: true },
    icon: { type: String, index: true, required: true },
    completedDate: { type: Date, index: true, required: false },
}, { timestamps: true });
const Goals = (0, mongoose_1.model)('Achievements', schema);
exports.default = Goals;
