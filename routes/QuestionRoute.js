const express = require("express");
const QuestionControllers = require("../controllers/QuestionControllers");

const router = express.Router();

router.get("/", QuestionControllers.getQuestion);
router.post("/create", QuestionControllers.createQuestion);
router.put("/:id", QuestionControllers.updateQuestion);
router.delete("/:id", QuestionControllers.deleteQuestion);

module.exports = router;
