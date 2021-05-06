const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const { Question } = require("../models");

// get all questions
exports.getQuestion = async (req, res, next) => {
  try {
    const { id } = req.params;
    const questions = await Question.findAll({
      where: { id },
      order: [["createdAt", "desc"]],
      attributes: [
        "title",
        "type",
        "points",
        "time_limit",
        "answer_options",
        "answer_1",
        "answer_2",
        "answer_3",
        "answer_4",
        "question_img",
      ],
    });

    res.status(200).json({ questions });
  } catch (err) {
    next(err);
  }
};

// create questions
exports.createQuestion = async (req, res, next) => {
  try {
    const {
      title,
      type,
      points,
      time_limit,
      answer_options,
      answer_1,
      answer_2,
      answer_3,
      answer_4,
      question_img,
    } = req.body;

    const question = await Question.create({
      title,
      type,
      points,
      time_limit,
      answer_options,
      answer_1,
      answer_2,
      answer_3,
      answer_4,
      question_img,
    });

    res.status(200).json({ question });
  } catch (err) {
    next(err);
  }
};

// update questions
exports.updateQuestion = async (req, res, next) => {
  try {
    const { id } = req.params;
    const {
      title,
      type,
      points,
      time_limit,
      answer_options,
      answer_1,
      answer_2,
      answer_3,
      answer_4,
      question_img,
    } = req.body;

    await Question.update(
      {
        title,
        type,
        points,
        time_limit,
        answer_options,
        answer_1,
        answer_2,
        answer_3,
        answer_4,
        question_img,
      },
      { where: { id } }
    );
    res.status(200).json({ message: "Successfully Updated" });
  } catch (err) {
    next(err);
  }
};

// delete questions
exports.deleteQuestion = async (req, res, next) => {
  try {
    const { id } = req.params;
    const question = await Question.findOne({
      where: { id },
    });
    if (!question) return res.status(400).json({ message: "Unfound Question" });

    await question.destryo();
    res.status(204).json({ message: "Succesfully Deleted" });
  } catch (err) {
    next(err);
  }
};
