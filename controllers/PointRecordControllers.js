const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const { PointRecord, UserHistory } = require("../models");

// getAllPointRecord
/**
 * @type {import('express').RequestHandler}
 */
exports.getAllPointRecord = async (req, res, next) => {
  try {
    const pointRecord = await PointRecord.findAll({
      order: [["createdAt", "desc"]],
      attributes: ["userAnswer", "point"],
    });
    res.status(200).json({ pointRecord });
  } catch (err) {
    next(err);
  }
};

// updatePointRecord
/**
 * @type {import('express').RequestHandler}
 */
exports.updatePointRecord = async (req, res, next) => {
  try {
    const { id } = req.params;
    const { userAnswer, points } = req.body;

    // Find "answer" in the Question
    const answer = await Question.findOne({
      where: { questionId: id },
      attributes: ["answer"],
    });

    // Validate as if the answer from Question is equal to User answer
    if ((answer === userAnswer)) {
      // add point to users whome answer correctly
      const newUserPoints = points;
      const newPoint = await UserHistory.update({
        totalUserPoints: totalUserPoints + newUserPoints,
        where: { userHistoryId: id },
      });
      res.status(200).json({ newPoint });
    } else {
      res.status(200).json({ message: "Try Again! Next Question" });
    }
  } catch (err) {
    next(err);
  }
};
