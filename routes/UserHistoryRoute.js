const express = require("express");
const UserHistoryControllers = require("../controllers/UserHistoryControllers");

const router = express.Router();

router.get("/:id/all", UserHistoryControllers.getAllUserHistory)
router.get("/:id", UserHistoryControllers.getUserHistory)
router.put("/:id", UserHistoryControllers.updateUserHistory)

module.exports = router;
