const router = require("express").Router();
const {
  createCategoryCtrl,
  getAllCategoriesCtrl,
  getSingleCategoryCtrl,
  updateCategoryCtrl,
  deleteCategoryCtrl,
} = require("../controllers/categoryController");
const { verifyToken } = require("../middleware/verifyToken");
const validateObjectId = require("../middleware/validateObjectId");

// /api/categories
router
  .route("/")
  .post(verifyToken, createCategoryCtrl)
  .get(verifyToken, getAllCategoriesCtrl);

// /api/categories/:id
router
  .route("/:id")
  .get(validateObjectId, getSingleCategoryCtrl)
  .put(validateObjectId, verifyToken, updateCategoryCtrl)
  .delete(validateObjectId, verifyToken, deleteCategoryCtrl);

module.exports = router;
