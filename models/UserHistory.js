module.exports = (sequelize, DataTypes) => {
  const UserHistory = sequelize.define("UserHistory", {
    total_user_points: {
      type: DataTypes.INTEGER,
      defaultValue: 0,
    },
  });

  UserHistory.associate = (models) => {
    // one UserHistory to many PointRecord
    UserHistory.hasMany(models.PointRecord, {
      foreignKey: {
        name: "point_record_id",
        allowNull: false,
      },
      onUpdate: "RESTRICT",
      onDelete: "RESTRICT",
    });

    // many UserHistory to one User
    UserHistory.belongsTo(models.User, {
      foreignKey: {
        name: "user_id",
        allowNull: false,
      },
      onUpdate: "RESTRICT",
      onDelete: "RESTRICT",
    });

    // many UserHistory to one Quiz
    UserHistory.belongsTo(models.Quiz, {
      foreignKey: {
        name: "quiz_id",
        allowNull: false,
      },
      onUpdate: "RESTRICT",
      onDelete: "RESTRICT",
    });
  };
  return UserHistory
};
