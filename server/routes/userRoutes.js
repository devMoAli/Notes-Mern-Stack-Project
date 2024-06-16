const { getUserProfileCtrl,  updateUserProfileCtrl,  deleteUserProfileCtrl } = require('../controllers/userController');
const validateObjectId = require('../middleware/validateObjectId');
const {
    verifyTokenAndOnlyUser,
    verifyTokenAndAuthorization
  } = require('../middleware/verifyToken');
const router = require("express").Router();

// /api/users/profile/:id
router
  .route('/profile/:id')
  .get(validateObjectId, getUserProfileCtrl)
  .put(validateObjectId, verifyTokenAndOnlyUser, updateUserProfileCtrl)
  .delete(validateObjectId, verifyTokenAndAuthorization,deleteUserProfileCtrl);

module.exports = router;