const mongoose = require("mongoose");

const ResumeSchema = new mongoose.Schema({
    userId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
    content: { type: String, required: true }
}, { timestamps: true });

module.exports = mongoose.model("Resume", ResumeSchema);
