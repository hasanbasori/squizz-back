const express = require('express')
const QuizControllers = require('../controllers/QuizControllers')
const CreatorControllers = require('../controllers/CreatorControllers')

const router = express.Router()

router.get('/', CreatorControllers.protectCreator, QuizControllers.getQuiz)
router.get(
  '/each-quiz/:id',
  CreatorControllers.protectCreator,
  QuizControllers.getEachQuiz
)
router.post(
  '/search',
  CreatorControllers.protectCreator,
  QuizControllers.searchQuiz
)
// router.post("/create", CreatorControllers.protectCreator, QuizControllers.createQuizAndQuestions);
router.post(
  '/create',
  CreatorControllers.protectCreator,
  QuizControllers.createDraftQuiz
)
router.put(
  '/update-quiz/:id',
  CreatorControllers.protectCreator,
  QuizControllers.updateQuizData
)
router.delete(
  '/:id',
  CreatorControllers.protectCreator,
  QuizControllers.deleteQuiz
)
// router.post("/create", CreatorControllers.protectCreator, QuizControllers.createQuiz);

module.exports = router
