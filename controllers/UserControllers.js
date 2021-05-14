const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const { User, UserHistory } = require("../models");

// get
/**
 * @type {import('express').RequestHandler}
 */
exports.getUser = async (req, res, next) => {
  try {
    const { id } = req.params;
    const name = await User.findOne({
      where: { id },
    });
    res.status(200).json({ name });
  } catch (err) {
    next(err);
  }
};

// name users
/**
 * @type {import('express').RequestHandler}
 */
exports.createUser = async (req, res, next) => {
  try {
    // create two tables at the same time
    const { name } = req.body;
    const user = await User.create({
      name,
      score: 0,
    });

    const { id } = req.params;
    // after creating user and get id, we create total_user_points and user_id in the UserHistory as well
    const userHistory = await UserHistory.create({
      totalUserPoints: 0,
      userId: user.id,
      quizId: id,
    });

    res.status(200).json({ message: "Successfully Name Created" });
  } catch (err) {
    next(err);
  }
};

//update users
/**
 * @type {import('express').RequestHandler}
 */
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
