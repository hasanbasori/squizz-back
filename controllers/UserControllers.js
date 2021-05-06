const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const { User } = require("../models");

// get
exports.getUser = async (req, res, next) => {
  try {
    const { user } = req.body;
    const name = User.findOne({
      where: { user },
    });
    res.status(200).json({ name });
  } catch (err) {
    next(err);
  }
};

// name users
exports.nameUser = async (req, res, next) => {
  try {
    const { name } = req.body;
    const user = User.create({
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
    const { id, score } = req.params;

    await User.update({ score }, { where: { id } });
    res.status(200).json({ message: "Successfully Updated" });
  } catch (err) {
    next(err);
  }
};
