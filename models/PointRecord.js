module.exports = (sequelize, DataTypes) => {
  const PointRecord = sequelize.define("PointRecord", {
    user_answer: {
      type: DataTypes.STRING,
      allowNull: false
    },
    points: {
      type: DataTypes.INTEGER,
      defaultValue: 0,
    },
  });

  PointRecord.associate = (models) => {
    // many PointRecord to one Question
    PointRecord.belongsTo(models.Question, {
      foreignKey: {
        name: "quesiton_id",
        allowNull: false,
      },
      onUpdate: "RESTRICT",
      onDelete: "RESTRICT",
    });

    // many PointRecord to one UserHistory
    PointRecord.belongsTo(models.UserHistory, {
      foreignKey: {
        name: "user_history_id",
        allowNull: false,
      },
      onUpdate: "RESTRICT",
      onDelete: "RESTRICT",
    });
  };
  return PointRecord
};
