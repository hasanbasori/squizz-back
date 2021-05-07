const express = require("express");
const QuestionControllers = require("../controllers/QuestionControllers");
const { route } = require("./UserHistoryRoute");

const router = express.Router();

router.get("/");
router.get("/:id");
router.post("/create");
router.put("/:id");

module.exports = router;
