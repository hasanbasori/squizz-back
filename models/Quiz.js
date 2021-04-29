module.exports = (sequelize, DataTypes) => {
  const Quiz = sequelize.define("Quiz", {
    pin: {
      type: DataTypes.INTEGER,
    },
  });

  // many Quiz to one Creator
  Quiz.associate = (models) => {
    Quiz.belongTo(models.Creator, {
      foreignKey: {
        name: "creator_id",
        allowNull: false,
      },
      onUpdate: "RESTRICT",
      onDelete: "RESTRICT",
    });
  };
  // many Quiz to one Collection
  Quiz.associate = (models) => {
    Quiz.belongTo(models.Collection, {
      foreignKey: {
        name: "collection_id",
        allowNull: false,
      },
      onUpdate: "RESTRICT",
      onDelete: "RESTRICT",
    });
  };
  // one Quiz to many Question
  Quiz.associate = (models) => {
    Quiz.hasMany(models.Question, {
      foreignKey: {
        name: "quiz_id",
        allowNull: false,
      },
      onUpdate: "RESTRICT",
      onDelete: "RESTRICT",
    });
  };
  return Quiz;
};
