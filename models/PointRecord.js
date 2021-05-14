module.exports = (sequelize, DataTypes) => {
  const PointRecord = sequelize.define("PointRecord", {
    userAnswer: {
      type: DataTypes.STRING,
      allowNull: false
    },
    points: {
      type: DataTypes.INTEGER,
      defaultValue: 0,
    },
  },
  {
    underscored: true,
  });

  PointRecord.associate = (models) => {
    // many PointRecord to one Question
    PointRecord.belongsTo(models.Question, {
      foreignKey: {
        name: "questionId",
        allowNull: false,
      },
      onUpdate: "RESTRICT",
      onDelete: "RESTRICT",
    });

    // many PointRecord to one UserHistory
    PointRecord.belongsTo(models.UserHistory, {
      foreignKey: {
        name: "userHistoryId",
        allowNull: false,
      },
      onUpdate: "RESTRICT",
      onDelete: "RESTRICT",
    });
  };
  return PointRecord
};
