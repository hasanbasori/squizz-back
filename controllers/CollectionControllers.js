const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const { Collection } = require("../models");

exports.getAllCollection = async (req, res, next) => {
  try {
    const allCollection = await Collection.findAll({
      order: [["createdAt", "desc"]],
      attributes: ["name", "description"],
    });

    res.status(200).json({ allCollection });
  } catch (err) {
    next(err);
  }
};

exports.createCollection = async (req, res, next) => {
  try {
    const { name, description } = req.body;

    await Collection.create({
      name,
      description,
    });

    res.status(200).json({ message: "Collection Successfully Created!" });
  } catch (err) {
    next(err);
  }
};

exports.updateCollection = async (req, res, next) => {
  try {
    const { name, description } = req.body;
    const { id } = req.params;

    await Collection.update({ name, description }, { where: { id } });
    res.status(200).json({ message: "Collection Successfully Updated!" });
  } catch (err) {
    next(err);
  }
};

exports.deleteCollection = async (req, res, next) => {
  try {
    const { id } = req.params;

    const collection = await Collection.findOne({ where: { id } });
    if (!collection)
      return res.status(400).json({ message: "Not Found The Collection!" });

    await collection.destroy();

    res.status(204).json({ message: "The Collection Successfully Removed!" });
  } catch (err) {
    next(err);
  }
};
