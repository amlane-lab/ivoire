"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose = require("mongoose");
exports.SequenceSchema = new mongoose.Schema({
    sequenceType: { type: String },
    sequenceNo: { type: Number },
}, {
    timestamps: true
});
//# sourceMappingURL=sequence.model.js.map