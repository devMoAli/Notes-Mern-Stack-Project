const {
  Category,
  validateCreateCategory,
  validateUpdateCategory,
} = require("../models/categoryModel");
const asyncHandler = require("express-async-handler");

/**-----------------------------------------------
 * @desc    Create New Category
 * @route   /api/categories
 * @method  POST
 * @access  private (only logged in user)
 ------------------------------------------------*/
module.exports.createCategoryCtrl = asyncHandler(async (req, res) => {
  const { error } = validateCreateCategory(req.body);
  if (error) {
    return res.status(400).json({ message: error.details[0].message });
  }

  const category = await Category.create({
    title: req.body.title,
    user: req.user.id,
  });
  await category.save();
  res.status(201).json(category);
});

/**-----------------------------------------------
 * @desc    Get All Categories
 * @route   /api/categories
 * @method  GET
 * @access  public
 ------------------------------------------------*/
module.exports.getAllCategoriesCtrl = asyncHandler(async (req, res) => {
  const userId = req.user.id;
  const categories = await Category.find({ user: userId });
  res.status(200).json(categories);
});
/**-----------------------------------------------
 * @desc    Get Single Category
 * @route   /api/category/:id
 * @method  GET
 * @access  public
 ------------------------------------------------*/
module.exports.getSingleCategoryCtrl = asyncHandler(async (req, res) => {
  const category = await Category.findById(req.params.id);

  if (!category) {
    return res.status(404).json({ message: "category not found" });
  }

  res.status(200).json(category);
});

/**-----------------------------------------------
 * @desc    Update Category 
 * @route   /api/categories/:id/update
 * @method  POST
 * @access  private (only logged in user)
 ------------------------------------------------*/
module.exports.updateCategoryCtrl = asyncHandler(async (req, res) => {
  // 1. Validation
  const { error } = validateUpdateCategory(req.body);
  if (error) {
    return res.status(400).json({ message: error.details[0].message });
  }

  // 2. Get the Category from DB and check if Category exists
  const category = await Category.findById(req.params.id);
  if (!category) {
    return res.status(404).json({ message: "Category not found" });
  }

  // 4. Update category
  const updatedCategory = await Category.findByIdAndUpdate(
    req.params.id,
    {
      $set: {
        title: req.body.title,
      },
    },
    { new: true }
  );

  // 5. Send the updated category to the client
  res.status(200).json(updatedCategory);
});
/**-----------------------------------------------
 * @desc    Delete Category
 * @route   /api/categories/:id
 * @method  DELETE
 * @access  private (only admin)
 ------------------------------------------------*/
module.exports.deleteCategoryCtrl = asyncHandler(async (req, res) => {
  const category = await Category.findById(req.params.id);
  if (!category) {
    return res.status(404).json({ message: "category not found" });
  }

  await Category.findByIdAndDelete(req.params.id);

  res.status(200).json({
    message: "category has been deleted successfully",
    categoryId: category._id,
  });
});
