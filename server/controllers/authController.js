const asyncHandler = require("express-async-handler");
const bcrypt = require("bcryptjs");
const generateToken = require("../utils/generateToken");
const { User } = require("../models/userModel");
const {
  validateRegisterUser,
  validateLoginUser,
} = require("../middleware/validationMiddleware");
const VerificationEmailToken = require("../models/VerifyEmailToken");
const crypto = require("crypto");
const sendEmail = require("../utils/sendEmail");
/**-----------------------------------------------
 * @desc    Register New User
 * @route   /api/auth/register
 * @method  POST
 * @access  public
 ------------------------------------------------*/
module.exports.registerUserCtrl = asyncHandler(async (req, res) => {
  // Validation
  const { error } = validateRegisterUser(req.body);
  if (error) {
    return res.status(400).json({ message: error.details[0].message });
  }

  // is user already exists
  let user = await User.findOne({ email: req.body.email });
  if (user) {
    return res.status(400).json({ message: "user already exist" });
  }

  // hash password
  const salt = await bcrypt.genSalt(10);
  const hashedPassword = await bcrypt.hash(req.body.password, salt);

  // new user and save to DB
  user = new User({
    username: req.body.username,
    email: req.body.email,
    password: hashedPassword,
  });
  await user.save();

  // Creating new VerificationToken & save it to DB
  const verificationToken = new VerificationEmailToken({
    userId: user._id,
    token: crypto.randomBytes(32).toString("hex"),
  });
  await verificationToken.save();

  // creating the Link
  const link = `${process.env.CLIENT_DOMAIN}/users/${user._id}/verify/${verificationToken.token}`;

  // putting the Link into html template
  const htmlTemplate = `
  <div>
    <p>Click on the link below to verify your email</p>
    <a href="${link}">Verify Link</a>
  </div>`;

  // sending email to user
  await sendEmail(user.email, "Verify Your Email", htmlTemplate);

  // Response to the client
  res.status(201).json({
    // message: "you registered successfully, Please Log in",
    message: "We sent to you an email, please verify your email address",
    _id: user._id,
    username: user.username,
    email: user.email,
  });
});
/**-----------------------------------------------
 * @desc    Login User
 * @route   /api/auth/login
 * @method  POST
 * @access  public
 ------------------------------------------------*/
module.exports.loginUserCtrl = asyncHandler(async (req, res) => {
  // Validation
  const { error } = validateLoginUser(req.body);
  if (error) {
    return res.status(400).json({ message: error.details[0].message });
  }

  // is user exists
  const user = await User.findOne({ email: req.body.email });
  if (!user) {
    return res.status(400).json({ message: "invalid email or password" });
  }

  // check password
  const isPasswordMatch = await bcrypt.compare(
    req.body.password,
    user.password
  );
  if (!isPasswordMatch) {
    return res.status(400).json({ message: "invalid email or password" });
  }

  // if Account not verified yet
  if (!user.isAccountVerified) {
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

    // creating the Link
    const link = `${process.env.CLIENT_DOMAIN}/users/${user._id}/verify/${verificationToken.token}`;

    // putting the Link into html template
    const htmlTemplate = `
  <div>
    <p>Click on the link below to verify your email</p>
    <a href="${link}">Verify Link</a>
  </div>`;

    // sending email to user
    await sendEmail(user.email, "Verify Your Email", htmlTemplate);

    return res.status(400).json({
      message: "We sent to you an email, please verify your email address",
    });
  }

  // generate new token (jwt)
  // const token = generateToken(user._id);
  const token = user.generateAuthToken();
  res.status(200).json({
    _id: user._id,
    username: user.username,
    email: user.email,
    token,
  });
});


/**-----------------------------------------------
 * @desc    Verify User Account
 * @route   /api/auth/:userId/verify/:token
 * @method  GET
 * @access  public
 ------------------------------------------------*/
 module.exports.verifyUserAccountCtrl = asyncHandler(async (req, res) => {
  const user = await User.findById(req.params.userId);
  if (!user) {
    return res.status(400).json({ message: "invalid link" });
  }

  const verificationToken = await VerificationEmailToken.findOne({
    userId: user._id,
    token: req.params.token,
  });

  if (!verificationToken) {
    return res.status(400).json({ message: "invalid link" });
  }

  user.isAccountVerified = true;
  await user.save();

  await VerificationEmailToken.deleteOne({ _id: verificationToken._id });

  res.status(200).json({ message: "Your account has been verified" });
});
