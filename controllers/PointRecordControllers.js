const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");


// getAllPointRecord
exports.getPointRecord = async (req, res, next) => {
  try {
    const pointRecord = await PointRecord.findAll({
      where: { id },
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
