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
    const { name, username, email, profile_img, password, role } = req.creator;

    res.status(200).json({
      Creators: { name, username, email, profile_img, password, role },
    });
  } catch (err) {
    next(err);
  }
};

// register
exports.registerCreator = async (req, res, next) => {
  try {
    const { name, username, email, profile_img, password, role } = req.body;

    const hashedPassword = await bcrypt.hash(
      password,
      +process.env.BCRYPT_SALT
    );

    const creator = await Creator.create({
      name,
      username,
      email,
      profile_img,
      password: hashedPassword,
      role,
    });

    const payload = { username, email, profile_img, role };
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
        .json({ message: "This username is not in the Squizz system yet!." });

    const isMatch = await bcrypt.compare(password, creator.password);
    if (!isMatch)
      return res.status(400).json({ message: "Incorrect Password!" });

    const payload = {
      id: creator.id,
      name: creator.name,
      username: creator.username,
      email: creator.email,
      profile_img: creator.profile_img,
      role: creator.role,
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
      { where: {id} }
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
