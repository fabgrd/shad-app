"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const schema = new mongoose_1.Schema({
    remainingDays: { type: Date, index: true, required: true },
    title: { type: String, index: true, required: true },
    user: { type: String, index: true, required: true }
}, { timestamps: true });
const Rewards = (0, mongoose_1.model)('Rewards', schema);
exports.default = Rewards;
