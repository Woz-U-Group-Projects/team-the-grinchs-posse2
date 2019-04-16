"use strict";
module.exports = (sequelize, DataTypes) => {
  const giftLists = sequelize.define(
    "giftLists",
    {
      listId: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true
      },
      listTitle: {
        allowNull: false,
        type: DataTypes.STRING
      }
    },
    {}
  );

  giftLists.associate = function(models) {
    // giftLists belongsTo users.
    giftLists.belongsTo(models.users, { foreignKey: "listOwner" });

    // giftLists hasMany gifts.
    giftLists.hasMany(models.gifts);
  };

  return giftLists;
};
