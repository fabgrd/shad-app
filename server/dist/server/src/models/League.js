"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const schema = new mongoose_1.Schema({
    name: { type: String, index: true, required: true },
    members: [{ type: String, index: true, required: true }],
    icon: { type: String, index: true, required: true },
    resetDate: { type: Date, index: true, required: true },
    level: { type: Number, index: true, required: true } // Nouveau champ
}, { timestamps: true });
const Leagues = (0, mongoose_1.model)('Leagues', schema);
exports.default = Leagues;
