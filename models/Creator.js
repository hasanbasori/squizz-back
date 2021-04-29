module.exports = (sequelize, DataTypes) => {
  const Creator = sequelize.define("Creator", {
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    username: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
    },
    profile_img: {
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
  });
  // one Creator to many Users
  Creator.associate = (models) => {
    Creator.hasMany(models.Users, {
      foreignKey: {
        name: "creator_id",
        allowNull: false,
      },
      onUpdate: "RESTRICT",
      onDelete: "RESTRICT,",
    });
  };
  // one Creator to many Quiz
  Creator.associate = (models) => {
    Creator.hasMany(models.Quiz, {
      foreignKey: {
        name: "creator_id",
        allowNull: false,
      },
      onUpdate: "RESTRICT",
      onDelete: "RESTRICT",
    });
  };
  return Creator;
};
