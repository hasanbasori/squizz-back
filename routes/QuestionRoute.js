const express = require("express");
const QuestionControllers = require("../controllers/QuestionControllers");
const CreatorControllers = require("../controllers/CreatorControllers")

const router = express.Router();

router.get("/:id", QuestionControllers.getQuestion);
router.post("/create/:id", QuestionControllers.createQuestion);
router.post("/draft-create/:id", CreatorControllers.protectCreator, QuestionControllers.addDraftQuestion);
router.put("/:id", QuestionControllers.updateQuestion);
router.delete("/:id", QuestionControllers.deleteQuestion);

module.exports = router;
