const express = require("express");
const QuizControllers = require("../controllers/QuizControllers");

const router = express.Router();

router.get("/", QuizControllers.getQuiz);
router.post("/create", QuizControllers.createQuiz);

module.exports = router;
