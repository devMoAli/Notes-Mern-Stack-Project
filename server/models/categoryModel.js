const mongoose = require("mongoose");
const Joi = require("joi");

const categorySchema = new mongoose.Schema(
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
  },
  {
    timestamps: true,
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
  }
);

const Category = mongoose.model("Category", categorySchema);

// Validate Category
function validateCreateCategory(obj) {
  const schema = Joi.object({
    title: Joi.string().trim().required(),
  });
  return schema.validate(obj);
}
// Validate Update Category
function validateUpdateCategory(obj) {
  const schema = Joi.object({
    title: Joi.string().trim(),
  });
  return schema.validate(obj);
}

module.exports = { Category, validateCreateCategory, validateUpdateCategory };
