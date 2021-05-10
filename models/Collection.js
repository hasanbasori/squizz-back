module.exports = (sequelize, DataTypes) => {
  const Collection = sequelize.define("Collection", {
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    description: {
      type: DataTypes.STRING,
    },
  });

  //one Collection to many Quiz
  Collection.associate = (models) => {
    Collection.hasMany(models.Quiz, {
      foreignKey: {
        name: "collection_id",
        allowNull: false,
      },
      onUpdate: "RESTRICT",
      onDelete: "RESTRICT",
    });

    // many Collection to one Creator
    Collection.belongsTo(models.Creator, {
      foreignKey: {
        name: "creator_id",
      },
      onUpdate: "RESTRICT",
      onDelete: "RESTRICT",
    });
  };
  return Collection;
};
