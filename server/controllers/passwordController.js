const asyncHandler = require("express-async-handler");
const bcrypt = require("bcryptjs");
const { User, validateEmail, validateNewPassword } = require("../models/userModel");
const VerificationEmailToken = require("../models/VerifyEmailToken");
const crypto = require("crypto");
const sendEmail = require("../utils/sendEmail");
/**-----------------------------------------------
 * @desc    Send Reset Password Link
 * @route   /api/password/reset-password-link
 * @method  POST
 * @access  public
 ------------------------------------------------*/
module.exports.sendResetPasswordLinkCtrl = asyncHandler(async (req, res) => {
  // 1. Validation "receiving email from user"
  const { error } = validateEmail(req.body);
  if (error) {
    return res.status(400).json({ message: error.details[0].message });
  }
  // 2. Get User from DB by Email
  const user = await User.findOne({ email: req.body.email });
  if (!user) {
    return res
      .status(404)
      .json({ message: "User with given email does not exist!" });
  }
  // 3. Creating VerificationToken
  let verificationToken = await VerificationEmailToken.findOne({
    userId: user._id,
  });
  if (!verificationToken) {
    verificationToken = new VerificationEmailToken({
      userId: user._id,
      token: crypto.randomBytes(32).toString("hex"),
    });
    await verificationToken.save();
  }
  // 4. Creating Link
  const link = `${process.env.CLIENT_DOMAIN}/reset-password/${user._id}/${verificationToken.token}`;

  // 5. Creating HTML Template
  const htmlTemplate = `<a href="${link}">Click here to reset your password</a>`;
  // 6. Sending Email
  await sendEmail(user.email, "Reset Password", htmlTemplate);
  // 7. Response to Client
  res.status(200).json({
    message:
      "Password Reset Link has been sent to your email, Please check your inbox",
  });
});
/**-----------------------------------------------
 * @desc    Get Reset Password Link
 * @route   /api/password/reset-password/:userId/:token
 * @method  GET
 * @access  public
 ------------------------------------------------*/
module.exports.getResetPasswordLinkCtrl = asyncHandler(async (req, res) => {
  const user = await User.findById(req.params.userId);
  if (!user) {
    return res.status(400).json({ message: "Invalid Link" });
  }
  const verificationToken = await VerificationEmailToken.findOne({
    userId: user._id,
    token: req.params.token,
  });
  if (!verificationToken) {
    return res.status(400).json({ message: "Invalid Link" });
  }
  res.status(200).json({
    message: "Valid URL",
  });
});
/**-----------------------------------------------
 * @desc    Reset Password 
 * @route   /api/password/reset-password/:userId/:token
 * @method  POST
 * @access  public
 ------------------------------------------------*/
module.exports.resetPasswordCtrl = asyncHandler(async (req, res) => {
  const { error } = validateNewPassword(req.body);
  if (error) {
    return res.status(400).json({ message: error.details[0].message });
  }
  const user = await User.findById(req.params.userId);
  if (!user) {
    return res.status(400).json({ message: "Invalid Link" });
  }
  const verificationToken = await VerificationEmailToken.findOne({
    userId: user._id,
    token: req.params.token,
  });
  if (!verificationToken) {
    return res.status(400).json({ message: "Invalid Link" });
  }
  if (!user.isAccountVerified) {
    user.isAccountVerified = true;
  }
  const salt = await bcrypt.genSalt(10);
  const hashedPassword = await bcrypt.hash(req.body.password, salt);
  user.password = hashedPassword;
  await user.save();
  await VerificationEmailToken.deleteOne({ _id: verificationToken._id });
  res
    .status(200)
    .json({ message: "Password reset successfully, please log in" });
});
