module.exports = (sequelize, DataTypes) => {
  const Quiz = sequelize.define("Quiz", {
    pin: {
      type: DataTypes.INTEGER,
    },
    link: {
      type: DataTypes.INTEGER,
    },
  });

  // many Quiz to one Creator
  Quiz.associate = (models) => {
    Quiz.belongsTo(models.Creator, {
      foreignKey: {
        name: "creator_id",
        allowNull: false,
      },
      onUpdate: "RESTRICT",
      onDelete: "RESTRICT",
    });

    // many Quiz to one Collection
    Quiz.belongsTo(models.Collection, {
      foreignKey: {
        name: "collection_id",
        allowNull: false,
      },
      onUpdate: "RESTRICT",
      onDelete: "RESTRICT",
    });

    // one Quiz to many Question
    Quiz.hasMany(models.Question, {
      foreignKey: {
        name: "quiz_id",
        allowNull: false,
      },
      onUpdate: "RESTRICT",
      onDelete: "RESTRICT",
    });

    // one quiz to many QuizHistory
  };
  return Quiz;
};
