const mongoose = require("mongoose");
const Joi = require("joi");

const noteSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: "User",
    },
    title: {
      type: String,
      required: true,
      trim: true,
    },
    content: {
      type: String,
      required: true,
      trim: true,
    },
    category: {
      type: String,
      required: true,
      trim: true,
    },
  },
  {
    timestamps: true,
  }
);

const Note = mongoose.model("Note", noteSchema);

// Validate Create Note
function validateCreateNote(obj) {
  const schema = Joi.object({
    title: Joi.string().trim().required(),
    content: Joi.string().trim().required(),
    category: Joi.string().trim().required(),
  });
  return schema.validate(obj);
}

// Validate Update Note
function validateUpdateNote(obj) {
  const schema = Joi.object({
    title: Joi.string().trim().required(),
    content: Joi.string().trim().required(),
    category: Joi.string().trim().required(),
  });
  return schema.validate(obj);
}

module.exports = { Note, validateCreateNote, validateUpdateNote };
