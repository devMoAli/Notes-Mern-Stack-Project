const mongoose = require("mongoose");

// Verification Token Schema
const VerifyEmailTokenSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    token: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

// Verification Token Model
const VerificationEmailToken = mongoose.model(
  "VerificationEmailToken",
  VerifyEmailTokenSchema
);

module.exports = VerificationEmailToken;
