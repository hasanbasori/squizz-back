const express = require("express");
const QuizControllers = require("../controllers/QuizControllers");
const CreatorControllers = require("../controllers/CreatorControllers")

const router = express.Router();

router.get("/", CreatorControllers.protectCreator, QuizControllers.getQuiz);
router.post("/create", CreatorControllers.protectCreator, QuizControllers.createQuiz);

module.exports = router;
