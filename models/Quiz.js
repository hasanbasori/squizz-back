module.exports = (sequelize, DataTypes) => {
  const Quiz = sequelize.define(
    "Quiz",
    {
      name: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      pin: {
        type: DataTypes.INTEGER,
      },
      link: {
        type: DataTypes.STRING,
      },
    },
    {
      underscored: true,
    }
  );

  // many Quiz to one Creator
  Quiz.associate = (models) => {
    Quiz.belongsTo(models.Creator, {
      foreignKey: {
        name: "creatorId",
        allowNull: false,
      },
      onUpdate: "RESTRICT",
      onDelete: "RESTRICT",
    });

    // many Quiz to one Collection
    Quiz.belongsTo(models.Collection, {
      foreignKey: {
        name: "collectionId",
        allowNull: false,
      },
      onUpdate: "RESTRICT",
      onDelete: "RESTRICT",
    });

    // one Quiz to many Question
    Quiz.hasMany(models.Question, {
      foreignKey: {
        name: "quizId",
        allowNull: false,
      },
      onUpdate: "RESTRICT",
      onDelete: "RESTRICT",
    });

    // one quiz to many UserHistory
    Quiz.hasMany(models.UserHistory, {
      foreignKey: {
        name: "quizId",
        allowNull: false,
      },
      onUpdate: "RESTRICT",
      onDelete: "RESTRICT",
    });
  };
  return Quiz;
};
