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
  // one Creator to many Collection
  Creator.associate = (models) => {
    Creator.hasMany(models.Collection, {
      foreignKey: {
        name: "collection_id",
        allowNull: false,
      },
      onUpdate: "RESTRICT",
      onDelete: "RESTRICT,",
    });

    // one Creator to many Quiz
    Creator.hasMany(models.Quiz, {
      foreignKey: {
        name: "quiz_id",
        allowNull: false,
      },
      onUpdate: "RESTRICT",
      onDelete: "RESTRICT",
    });
  };
  return Creator;
};
