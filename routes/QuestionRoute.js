const express = require("express");
const QuestionControllers = require("../controllers/QuestionControllers");

const router = express.Router();

router.get("/:id", QuestionControllers.getQuestion);
router.post("/create/:id", QuestionControllers.createQuestion);
router.put("/:id", QuestionControllers.updateQuestion);
router.delete("/:id", QuestionControllers.deleteQuestion);

module.exports = router;
