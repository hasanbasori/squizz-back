const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const { Quiz, Question, Creator, sequelize } = require('../models')
const { Op } = require('sequelize')
// get quiz
/**
 * @type {import('express').RequestHandler}
 */
exports.getQuiz = async (req, res, next) => {
  try {
    // get method cannot use req.body and text inside currey blanket must be the same as path on the route (router.get("/:id", QuizControllers.getQuiz);)
    // const { id } = req.params;
    const { id: creatorId } = req.creator

    const quiz = await Quiz.findAll({
      where: { creatorId },
      order: [['createdAt', 'desc']],
      include: {
        model: Question
      }
    })

    res.status(200).json({ quiz })
  } catch (err) {
    next(err)
  }
}

// get quiz
/**
 * @type {import('express').RequestHandler}
 */
exports.getEachQuiz = async (req, res, next) => {
  try {
    // get method cannot use req.body and text inside currey blanket must be the same as path on the route (router.get("/:id", QuizControllers.getQuiz);)
    const { id } = req.params

    const quiz = await Quiz.findOne({
      where: { id },
      order: [['createdAt', 'desc']],
      include: {
        model: Question
      }
    })

    res.status(200).json({ quiz })
  } catch (err) {
    next(err)
  }
}

exports.searchQuiz = async (req, res, next) => {
  try {
    const { searchData } = req.body
    const search = await Quiz.findAll({
      where: { name: { [Op.like]: `%${searchData}%` } },
      order: [['name']]
    })

    res.status(200).json({ search })
  } catch (err) {
    next(err)
  }
}

// generate pin
/**
 * @type {import('express').RequestHandler}
 */
exports.createQuizAndQuestions = async (req, res, next) => {
  const transaction = await sequelize.transaction()
  try {
    const { id } = req.creator
    const {
      quizName,
      description,
      questionName,
      questionType,
      points,
      timeLimit,
      answerOptions,
      option1,
      option2,
      option3,
      option4,
      questionImg,
      answer
    } = req.body
    const pin = Math.floor(Math.random() * 10000000)

    //generate path
    function makeid() {
      let result = []
      let characters =
        'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789'
      let charactersLength = characters.length
      for (var i = 0; i < 45; i++) {
        result.push(
          characters.charAt(Math.floor(Math.random() * charactersLength))
        )
      }
      return result.join('')
    }
    const randomText = makeid()
    let link = '/' + randomText

    const date = new Date()

    // create data in SQL of Quiz
    const quiz = await Quiz.create(
      {
        name: quizName,
        description: description ? description : null,
        pin,
        link,
        createdDate: date,
        // need to create id in the SQL as well which can be fetched data from req.body or req.params
        creatorId: id
      },
      { transaction }
    )

    const question = await Question.create(
      {
        title: questionName,
        type: questionType,
        points,
        timeLimit,
        answerOptions,
        option1,
        option2,
        option3,
        option4,
        questionImg,
        answer,
        quizId: quiz.id
      },
      { transaction }
    )

    await transaction.commit()

    res.status(200).json({ quiz, question })
  } catch (err) {
    await transaction.rollback()
    next(err)
  }
}

// generate pin
/**
 * @type {import('express').RequestHandler}
 */
exports.createQuiz = async (req, res, next) => {
  try {
    const { id } = req.creator
    const { name } = req.body
    const pin = Math.floor(Math.random() * 10000000)

    //generate path
    function makeid() {
      let result = []
      let characters =
        'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789'
      let charactersLength = characters.length
      for (var i = 0; i < 45; i++) {
        result.push(
          characters.charAt(Math.floor(Math.random() * charactersLength))
        )
      }
      return result.join('')
    }
    const randomText = makeid()
    let link = '/' + randomText

    // create data in SQL of Quiz
    const quiz = await Quiz.create({
      name,
      pin,
      link,
      // need to create id in the SQL as well which can be fetched data from req.body or req.params
      creatorId: id
    })

    res.status(200).json({ quiz })
  } catch (err) {
    next(err)
  }
}

// generate pin
/**
 * @type {import('express').RequestHandler}
 */
exports.createDraftQuiz = async (req, res, next) => {
  const transaction = await sequelize.transaction()
  try {
    const { id } = req.creator
    const date = new Date()
    const pin = Math.floor(Math.random() * 10000000)

    //generate path
    function makeid() {
      let result = []
      let characters =
        'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789'
      let charactersLength = characters.length
      for (var i = 0; i < 45; i++) {
        result.push(
          characters.charAt(Math.floor(Math.random() * charactersLength))
        )
      }
      return result.join('')
    }
    const randomText = makeid()
    let link = '/' + randomText

    // create data in SQL of Quiz
    const quiz = await Quiz.create(
      {
        name: 'titleDraft',
        pin,
        link,
        createdDate: date,
        // need to create id in the SQL as well which can be fetched data from req.body or req.params
        creatorId: id
      },
      { transaction }
    )

    const question = await Question.create(
      {
        title: 'draft',
        type: 'quiz',
        points: 1,
        timeLimit: 30,
        answerOptions: 1,
        option1: 'draft',
        option2: 'draft',
        answer: 'draft',
        quizId: quiz.id
      },
      { transaction }
    )

    await transaction.commit()

    res.status(200).json({ quiz, question })
  } catch (err) {
    next(err)
    await transaction.rollback()
  }
}

// generate pin
/**
 * @type {import('express').RequestHandler}
 */
exports.updateQuizData = async (req, res, next) => {
  try {
    const { id } = req.params
    const { name, description } = req.body

    console.log(`nameName`, req.body)
    // create data in SQL of Quiz
    const quiz = await Quiz.update(
      {
        name,
        description
      },
      {
        where: {
          id
        }
      }
    )

    res.status(200).json({ quiz })
  } catch (err) {
    next(err)
  }
}

exports.deleteQuiz = async (req, res, next) => {
  try {
    const { id } = req.params

    const quiz = await Quiz.findOne({ where: { id } })
    if (!quiz) return res.status(400).json({ message: 'quiz not found' })
    if (quiz.creatorId !== req.creator.id)
      return res
        .status(400)
        .json({ message: `cannot delete other creator's quiz` })

    await quiz.destroy()

    res.status(204).json()
  } catch {
    next(err)
  }
}
