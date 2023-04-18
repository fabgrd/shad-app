"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const schema = new mongoose_1.Schema({
    delay: { type: Date, index: true, required: true },
    goal: { type: String, index: true, required: true },
    user: { type: String, index: true, required: true }
}, { timestamps: true });
const Goals = (0, mongoose_1.model)('Goals', schema);
exports.default = Goals;
