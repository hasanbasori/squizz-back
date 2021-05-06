const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const { Quiz } = require("../models");

// get quiz
exports.getQuiz = async (req, res, next) => {
  try {
    const quiz = await Quiz.findAll({ where: { id } });
    res.status(200).json({ quiz });
  } catch (err) {
    next(err);
  }
};
