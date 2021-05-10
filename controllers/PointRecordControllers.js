const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const { PointRecord, UserHistory } = require("../models");

// getAllPointRecord
exports.getAllPointRecord = async (req, res, next) => {
  try {
    const pointRecord = await PointRecord.findAll({
      order: [["createdAt", "desc"]],
      attributes: ["user_answer", "point"],
    });
    res.status(200).json({ pointRecord });
  } catch (err) {
    next(err);
  }
};

// createPointRecord
exports.createPointRecord = async (req, res, next) => {
  try {
    const { id } = req.params;
    const { user_answer, points } = req.body;

    // Find "answer" in the Question
    const answer = await Question.findOne({
      where: { question_id: id },
      attributes: ["answer"],
    });

    // Validate as if the answer from Question is equal to User answer
    if ((answer = user_answer)) {
      // add point to users whome answer correctly
      const new_user_points = points;
      res.status(200).json({ new_user_points });
    } else {
      res.status(200).json({ message: "Try Again! Next Question" });
    }
  } catch (err) {
    next(err);
  }
};

// updatePointRecord
exports.updatePointRecord = async (req, res, next) => {
  try {
    const { user_answer, point } = req.body;

    const pointRecord = await PointRecord.update({
      user_answer,
      point,
    });
  } catch (err) {
    next(err);
  }
};
