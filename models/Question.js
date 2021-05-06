module.exports = (sequelize, DataTypes) => {
  const Question = sequelize.define("Question", {
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
    time_limit: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    answer_options: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },  
    answer_1: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    answer_2: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    answer_3: {
      type: DataTypes.STRING,
    },
    answer_4: {
      type: DataTypes.STRING,
    },
    question_img: {
      type: DataTypes.STRING,
    },
  });
  // many Question to one Quiz
  Question.associate = (models) => {
    Question.belongsTo(models.Quiz, {
      foreignKey: {
        name: "quiz_id",
        allowNull: false,
      },
      onUpdate: "RESTRICT",
      onDelete: "RESTRICT",
    });
  };
  return Question;
};

