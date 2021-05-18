const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const { Question } = require("../models");

// get all questions
/**
 * @type {import('express').RequestHandler}
 */
exports.getQuestion = async (req, res, next) => {
  try {
    const { id } = req.params;
    const questions = await Question.findAll({
      where: { quizId: id },
      order: [["createdAt", "desc"]],
      attributes: [
        "title",
        "type",
        "points",
        "timeLimit",
        "answerOptions",
        "option1",
        "option2",
        "option3",
        "option4",
        "questionImg",
        "answer",
        "quizId",
      ],
    });

    res.status(200).json({ questions });
  } catch (err) {
    next(err);
  }
};

// create questions
/**
 * @type {import('express').RequestHandler}
 */
exports.addDraftQuestion = async (req, res, next) => {
  try {
    const { id } = req.params;

    const question = await Question.create({
      title: "draft",
      type: "quiz",
      points: 1,
      timeLimit: 30,
      answerOptions: 1,
      option1: "draft",
      option2: "draft",
      answer: "draft",
      quizId: id,
    });

    res.status(200).json({ question });
  } catch (err) {
    next(err);
  }
};

// create questions
/**
 * @type {import('express').RequestHandler}
 */
exports.createQuestion = async (req, res, next) => {
  try {
    const { id } = req.params;
    const {
      title,
      type,
      points,
      timeLimit,
      answerOptions,
      option1,
      option2,
      option3,
      option4,
      questionImg,
      answer,
    } = req.body;

    const question = await Question.create({
      title,
      type,
      points,
      timeLimit,
      answerOptions,
      option1,
      option2,
      option3,
      option4,
      questionImg,
      answer,
      quizId: id,
    });

    res.status(200).json({ question });
  } catch (err) {
    next(err);
  }
};

// update questions
/**
 * @type {import('express').RequestHandler}
 */
exports.updateQuestion = async (req, res, next) => {
  try {
    const { id } = req.params;
    const {
      title,
      type,
      points,
      timeLimit,
      answerOptions,
      option1,
      option2,
      option3,
      option4,
      questionImg,
      answer,
    } = req.body;

    await Question.update(
      {
        title,
        type,
        points,
        timeLimit,
        answerOptions,
        option1,
        option2,
        option3,
        option4,
        questionImg,
        answer,
      },
      { where: { id } }
    );
    
    res.status(200).json({ message: "Successfully Updated" });
  } catch (err) {
    next(err);
  }
};

// update questions
/**
 * @type {import('express').RequestHandler}
 */
 exports.updateOriginalQuestion = async (req, res, next) => {
  try {
    const { id } = req.params;
    const {
      title,
      type,
      points,
      timeLimit,
      answerOptions,
      option1,
      option2,
      option3,
      option4,
      questionImg,
      answer,
    } = req.body;

    await Question.update(
      {
        title,
        type,
        points,
        timeLimit,
        answerOptions,
        option1,
        option2,
        option3,
        option4,
        questionImg,
        answer,
      },
      { where: { id } }
    );
    res.status(200).json({ message: "Successfully Updated" });
  } catch (err) {
    next(err);
  }
};

// delete questions
/**
 * @type {import('express').RequestHandler}
 */
exports.deleteQuestion = async (req, res, next) => {
  try {
    const { id } = req.params;
    const question = await Question.findOne({
      where: { id },
    });
    if (!question) return res.status(400).json({ message: "Unfound Question" });

    await question.destroy();
    res.status(204).json({ message: "Succesfully Deleted" });
  } catch (err) {
    next(err);
  }
};
