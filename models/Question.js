module.exports = (sequelize, DataTypes) => {
  const Question = sequelize.define(
    "Question",
    {
      title: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      type: {
        type: DataTypes.STRING,
      },
      points: {
        type: DataTypes.INTEGER,
        defaultValue: 0,
      },
      timeLimit: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      answerOptions: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      option1: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      option2: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      option3: {
        type: DataTypes.STRING,
      },
      option4: {
        type: DataTypes.STRING,
      },
      questionImg: {
        type: DataTypes.STRING,
      },
      answer: {
        type: DataTypes.STRING,
      },
    },
    {
      underscored: true,
    }
  );
  // many Question to one Quiz
  Question.associate = (models) => {
    Question.belongsTo(models.Quiz, {
      foreignKey: {
        name: "quizId",
        allowNull: false,
      },
      onUpdate: "CASCADE",
      onDelete: "CASCADE",
    });

    // one Question to many PointRecord
    Question.hasMany(models.PointRecord, {
      foreignKey: {
        name: "questionId",
        allowNull: false,
      },
      onUpdate: "RESTRICT",
      onDelete: "RESTRICT",
    });
  };
  return Question;
};
