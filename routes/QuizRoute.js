const express = require("express");
const QuizControllers = require("../controllers/QuizControllers");

const router = express.Router();

router.get("/", QuizControllers.getQuiz);

module.exports = router;
