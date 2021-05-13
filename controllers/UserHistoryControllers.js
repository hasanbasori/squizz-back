const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const { UserHistory, User } = require("../models");

//getAllUserHistory
exports.getAllUserHistory = async (req, res, next) => {
  try {
    const { id } = req.params; // quiz_id
    const totalUserPoints = await UserHistory.findAll({
      where: { quiz_id: id },
      order: [["totalUserPoints", "desc"]], // อ้นดับเป็น array

      // include data from a column of "name' in the User table
      includes: { models: User, attributes: ["name"] },
    });

    res.status(200).json({ totalUserPoints });
  } catch (err) {
    next(err);
  }
};

//getUserHistory
exports.getUserHistory = async (req, res, next) => {
  try {
    const { id } = req.params;
    const totalUserPoints = await UserHistory.findOne({
      where: { id },
    });
    res.status(200).json({ totalUserPoints });
  } catch (err) {
    next(err);
  }
};

//updateUserHistory
exports.updateUserHistory = async (req, res, next) => {
  try {
    const { id } = req.params;
    const { newUserPoints } = req.body;

    const oldTotalUserPoints = await UserHistory.findOne({
      where: { id },
      attributes: ["totalUserPoints"],
    });

    await UserHistory.update(
      {
        totalUserPoints:
          oldTotalUserPoints.totalUserPoints + newUserPoints,
      },
      { where: { id } }
    );

    res.status(200).json({ message: "Successfully Updated" });
  } catch (err) {
    next(err);
  }
};
