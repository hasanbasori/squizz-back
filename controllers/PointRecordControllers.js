const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const { PointRecord } = require("../models");

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
    const { user_answer, point } = req.body;
    // pull the answer from Question

    // Validate as if the answer from Question is equal to User answer
    const pointRecord = await PointRecord.create({
      user_answer,
      point,
    });

    res.status(200).json({ pointRecord });
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
