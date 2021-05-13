const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const { Creator } = require("../models");

// protect
exports.protectCreator = async (req, res, next) => {
  try {
    let token = null;

    if (
      req.headers.authorization &&
      req.headers.authorization.startsWith("Bearer")
    )
      token = req.headers.authorization.split(" ")[1];

    if (!token)
      return res
        .status(200)
        .json({ message: "You're not yet the Squizz creator!." });

    const payload = jwt.verify(token, process.env.JWT_SECRET);
    console.log(payload);

    const creator = await Creator.findOne({ where: { id: payload.id } });
    req.creator = creator;
    next();
  } catch (err) {
    next(err);
  }
};

// get
exports.myInfo = async (req, res, next) => {
  try {
    const {
      id,
      name,
      username,
      email,
      profile_img,
      password,
      role,
      createdAt,
    } = req.creator;

    res.status(200).json({
      creators: {
        id,
        name,
        username,
        email,
        profile_img,
        password,
        role,
        createdAt,
      },
    });
  } catch (err) {
    next(err);
  }
};

// register
exports.registerCreator = async (req, res, next) => {
  try {
    const {
      name,
      username,
      email,
      profileImg,
      password,
      confirmPassword,
      role,
    } = req.body;

    if (!name) return res.status(400).json({ message: "name is required" });
    if (!email) return res.status(400).json({ message: "email is required" });
    if (!username)
      return res.status(400).json({ message: "username is required" });
    if (!password)
      return res.status(400).json({ message: "password is required" });
    if (!confirmPassword)
      return res.status(400).json({ message: "confirm password is required" });

    if (!username.match(/^[0-9a-zA-Z]+$/))
      return res
        .status(400)
        .json({ message: "username can not be alphanumeric" });
    if (!password.match(/^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9]).{8,16}$/))
      return res.status(400).json({
        message:
          "The number of password must be between 8 and 16 characters and must have Capital letters",
      });
    if (password !== confirmPassword)
      return res.status(400).json({ message: "password is not match" });
    const validateEmail = await Creator.findOne({ where: { email } });
    if (validateEmail)
      return res.status(400).json({ message: "email is exist" });
    const validateUsername = await Creator.findOne({ where: { username } });
    if (validateUsername)
      return res.status(400).json({ message: "username is exist" });

    const hashedPassword = await bcrypt.hash(
      password,
      +process.env.BCRYPT_SALT
    );

    const creator = await Creator.create({
      name,
      username,
      email,
      profileImg,
      password: hashedPassword,
      role,
    });

    // set id in the payload as well to be able to get id when log
    const payload = {
      id: creator.id,
      name,
      username,
      email,
      profileImg,
      role,
      createdAt: creator.createdAt,
    };
    const token = jwt.sign(payload, process.env.JWT_SECRET, {
      expiresIn: +process.env.JWT_EXPIRES_IN,
    });

    res.status(200).json({ token });
  } catch (err) {
    next(err);
  }
};

// login
exports.loginCreator = async (req, res, next) => {
  try {
    const { username, password } = req.body;

    const creator = await Creator.findOne({ where: { username } });
    if (!creator)
      return res
        .status(400)
        .json({ message: "username, email or password incorrect!" });

    const isMatch = await bcrypt.compare(password, creator.password);
    if (!isMatch)
      return res
        .status(400)
        .json({ message: "username, email or password incorrect!" });

    const payload = {
      id: creator.id,
      name: creator.name,
      username: creator.username,
      email: creator.email,
      profile_img: creator.profile_img,
      role: creator.role,
      createdAt: creator.createdAt,
    };

    const token = jwt.sign(payload, process.env.JWT_SECRET, {
      expiresIn: +process.env.JWT_EXPIRES_IN,
    });

    res.status(200).json({ token });
  } catch (err) {
    next(err);
  }
};

// update
exports.updateCreator = async (req, res, next) => {
  try {
    const { name, username, email, profile_img, password, role } = req.body;
    const { id } = req.params;

    const hashedPassword = await bcrypt.hash(
      password,
      +process.env.BCRYPT_SALT
    );

    await Creator.update(
      {
        name,
        username,
        email,
        profile_img,
        password: hashedPassword,
        role,
      },
      { where: { id } }
    );

    res.status(200).json({ message: "Successfully Creator's Info Updated!." });
  } catch (err) {
    next(err);
  }
};

// delete
exports.deleteCreator = async (req, res, next) => {
  try {
    const { id } = req.params;
    const creator = await Creator.findOne({ where: { id } });

    if (!creator)
      return res
        .status(400)
        .json({ message: "There is no this creator in the Squizz system." });

    await creator.destroy();
    res.status(200).json({ message: "Your account has been removed!." });
  } catch (err) {
    next(err);
  }
};
