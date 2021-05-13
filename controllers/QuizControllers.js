const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const { Quiz, Question } = require("../models");

// get quiz
exports.getQuiz = async (req, res, next) => {
  try {
    // get method cannot use req.body and text inside currey blanket must be the same as path on the route (router.get("/:id", QuizControllers.getQuiz);)
    const { id } = req.params;

    const quiz = await Quiz.findAll({
      where: { creatorId: id },
      order: [["createdAt", "desc"]],
    });

    const countQuiz = await Quiz.findAndCountAll({
      where: { creatorId: id },
    });

    const countQuestion = await Quiz.findAndCountAll({
      where: { creatorId: id },
      include: {
        model: Question,
      },
    })

    res.status(200).json({ quiz, countQuiz, countQuestion });
  } catch (err) {
    next(err);
  }
};

// generate pin
exports.createQuiz = async (req, res, next) => {
  try {
    const { collectionId, creatorId, name } = req.body;
    const pin = Math.floor(Math.random() * 10000000);

    //generate path
    function makeid() {
      let result = [];
      let characters =
        "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
      let charactersLength = characters.length;
      for (var i = 0; i < 45; i++) {
        result.push(
          characters.charAt(Math.floor(Math.random() * charactersLength))
        );
      }
      return result.join("");
    }
    const randomText = makeid();
    let link = "/" + randomText;

    // create data in SQL of Quiz
    const quiz = await Quiz.create({
      name,
      pin,
      link,
      // need to create id in the SQL as well which can be fetched data from req.body or req.params
      collectionId: collectionId,
      creatorId: creatorId,
    });

    res.status(200).json({ quiz });
  } catch (err) {
    next(err);
  }
};
