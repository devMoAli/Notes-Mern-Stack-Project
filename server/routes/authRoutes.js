const router = require("express").Router();
const {registerUserCtrl, loginUserCtrl, verifyUserAccountCtrl} = require('../controllers/authController');

router.post('/register', registerUserCtrl);
router.post('/login', loginUserCtrl);
// /api/auth/:userId/verify/:token
router.get("/:userId/verify/:token", verifyUserAccountCtrl);
module.exports = router;
