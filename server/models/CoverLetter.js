const mongoose = require("mongoose");

const CoverLetterSchema = new mongoose.Schema({
    userId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
    content: { type: String, required: true }
}, { timestamps: true });

module.exports = mongoose.model("CoverLetter", CoverLetterSchema);
