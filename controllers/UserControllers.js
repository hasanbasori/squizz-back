const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const { User } = require("../models");

// get
exports.getUser = async (req, res, next) => {
  try {
    const { id } = req.params;
    const name = await User.findOne({
      where: { id }
    });
    res.status(200).json({ name });
  } catch (err) {
    next(err);
  }
};

// name users
exports.createUser = async (req, res, next) => {
  try {
    const { name } = req.body;
    const user = await User.create({
      name,
      score: 0,
    });

    res.status(200).json({ message: "Successfully Name Created" });
  } catch (err) {
    next(err);
  }
};

//update users
exports.updateUser = async (req, res, next) => {
  try {
    const { id } = req.params;
    const { score } = req.body;

    await User.update({ score }, { where: { id } });
    res.status(200).json({ message: "Successfully Updated" });
  } catch (err) {
    next(err);
  }
};
