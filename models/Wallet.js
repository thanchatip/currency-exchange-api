const { Model, DataTypes } = require("sequelize");
const sequelize = require("../config/database");
const User = require("./User");
const CryptoCurrency = require("./CryptoCurrency");

class Wallet extends Model {}

Wallet.init(
  {
    WalletID: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    UserID: {
      type: DataTypes.INTEGER,
      references: {
        model: User,
        key: "UserID",
      },
      allowNull: false,
    },
    CryptoCurrencyID: {
      type: DataTypes.INTEGER,
      references: {
        model: CryptoCurrency,
        key: "CryptoCurrencyID",
      },
      allowNull: false,
    },
    Balance: {
      type: DataTypes.FLOAT,
      defaultValue: 0.0,
    },
  },
  {
    sequelize,
    modelName: "Wallet",
  }
);

Wallet.belongsTo(User, { foreignKey: "UserID" });
Wallet.belongsTo(CryptoCurrency, { foreignKey: "CryptoCurrencyID" });

module.exports = Wallet;
