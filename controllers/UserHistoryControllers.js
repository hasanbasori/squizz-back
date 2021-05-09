const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");


//getAllUserHistory
exports.getAllUserHistory = async (req, res, next) => {
  try {
    const total_user_points = await UserHistory.findAll({
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
    const { total_user_points } = req.body;

    await UserHistory.update(
      { total_user_points: total_user_points + total_user_points },
      { where: { id } }
    );
  } catch (err) {
    next(err);
  }
};
