module.exports = (sequelize, DataTypes) => {
  const UserHistory = sequelize.define(
    "UserHistory",
    {
      totalUserPoints: {
        type: DataTypes.INTEGER,
        defaultValue: 0,
      },
    },
    {
      underscored: true,
    }
  );

  UserHistory.associate = (models) => {
    // one UserHistory to many PointRecord
    UserHistory.hasMany(models.PointRecord, {
      foreignKey: {
        name: "userHistoryId",
        allowNull: false,
      },
      onUpdate: "RESTRICT",
      onDelete: "RESTRICT",
    });

    // many UserHistory to one User
    UserHistory.belongsTo(models.User, {
      foreignKey: {
        name: "userId",
        allowNull: false,
      },
      onUpdate: "RESTRICT",
      onDelete: "RESTRICT",
    });

    // many UserHistory to one Quiz
    UserHistory.belongsTo(models.Quiz, {
      foreignKey: {
        name: "quizId",
        allowNull: false,
      },
      onUpdate: "RESTRICT",
      onDelete: "RESTRICT",
    });
  };
  return UserHistory;
};
