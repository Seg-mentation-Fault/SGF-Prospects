const { DataTypes, Model } = require('sequelize');

const mapProspect = (sequelize) => {
  class Prospect extends Model {}

  Prospect.init(
    {
      // Model attributes are defined here
      id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        unique: true,
      },
      name: {
        type: DataTypes.STRING(128),
        allowNull: true,
        validate: {
          isNumeric: false,
        },
      },
      email: {
        type: DataTypes.STRING(128),
        allowNull: false,
        unique: true,
        validate: {
          isEmail: true,
        },
      },
    },
    {
      // Other model options go here
      sequelize, // We need to pass the connection instance
      modelName: 'Prospect', // We need to choose the model name
    }
  );
  (async () => {
    await Prospect.sync();
  })();
  return Prospect;
};

module.exports = mapProspect;
