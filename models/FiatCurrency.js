const { Model, DataTypes } = require("sequelize");
const sequelize = require("../config/database");

class FiatCurrency extends Model {}

FiatCurrency.init(
  {
    FiatCurrencyID: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    FiatCurrencyCode: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    FiatCurrencyName: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  },
  {
    sequelize,
    modelName: "FiatCurrency",
  }
);

module.exports = FiatCurrency;
