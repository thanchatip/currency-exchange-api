const { Model, DataTypes } = require("sequelize");
const sequelize = require("../config/database");

class CryptoCurrency extends Model {}

CryptoCurrency.init(
  {
    CryptoCurrencyID: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    CryptoCurrencyCode: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    CryptoCurrencyName: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  },
  {
    sequelize,
    modelName: "CryptoCurrency",
  }
);

module.exports = CryptoCurrency;
