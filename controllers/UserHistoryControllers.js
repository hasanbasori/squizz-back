const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const { UserHistory, User } = require("../models");

//getAllUserHistory
exports.getAllUserHistory = async (req, res, next) => {
  try {
    const { id } = req.params; // quiz_id
    const total_user_points = await UserHistory.findAll({
      where: { quiz_id: id },
      order: [["total_user_points", "desc"]], // อ้นดับเป็น array

      // include data from a column of "name' in the User table
      includes: { models: User, attributes: ["name"] },
    });

    res.status(200).json({ total_user_points });
  } catch (err) {
    next(err);
  }
};

//getUserHistory
exports.getUserHistory = async (req, res, next) => {
  try {
    const { id } = req.params;
    const total_user_points = await UserHistory.findOne({
      where: { id },
    });
    res.status(200).json({ total_user_points });
  } catch (err) {
    next(err);
  }
};

//updateUserHistory
exports.updateUserHistory = async (req, res, next) => {
  try {
    const { id } = req.params;
    const { total_user_points } = req.body;

    const old_total_user_points = await UserHistory.findOne({
      where: { id },
      attributes: ["total_user_points"],
    });

    await UserHistory.update(
      {
        total_user_points:
          old_total_user_points.total_user_points + total_user_points,
      },
      { where: { id } }
    );

    res.status(200).json({ message: "Successfully Updated" });
  } catch (err) {
    next(err);
  }
};
