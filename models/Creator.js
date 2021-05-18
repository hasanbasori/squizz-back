module.exports = (sequelize, DataTypes) => {
  const Creator = sequelize.define(
    "Creator",
    {
      name: {
        type: DataTypes.STRING,
      },
      username: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
      },
      email: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
      },
      birthdate: {
        type: DataTypes.DATEONLY,
        allowNull: false,
      },
      profileImg: {
        type: DataTypes.STRING,
      },
      password: {
        type: DataTypes.STRING,
      },
      role: {
        type: DataTypes.ENUM,
        values: ["PERSONAL", "STUDENT", "TEACHER", "PROFESSIONAL"],
        allowNull: false,
        defaultValue: "PERSONAL",
      },
    },
    {
      underscored: true,
    }
  );
  // one Creator to many Collection
  Creator.associate = (models) => {
    Creator.hasMany(models.Collection, {
      foreignKey: {
        name: "creatorId",
        allowNull: false,
      },
      onUpdate: "RESTRICT",
      onDelete: "RESTRICT",
    });

    // one Creator to many Quiz
    Creator.hasMany(models.Quiz, {
      foreignKey: {
        name: "creatorId",
        allowNull: false,
      },
      onUpdate: "RESTRICT",
      onDelete: "RESTRICT",
    });
  };
  return Creator;
};
