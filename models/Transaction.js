const { Model, DataTypes } = require("sequelize");
const sequelize = require("../config/database");
const Wallet = require("./Wallet");

class Transaction extends Model {}

Transaction.init(
  {
    TransactionID: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    WalletID: {
      type: DataTypes.INTEGER,
      references: {
        model: Wallet,
        key: "WalletID",
      },
      allowNull: false,
    },
    TransactionType: {
      type: DataTypes.ENUM,
      values: ["Deposit", "Withdrawal", "Transfer"],
      allowNull: false,
    },
    Amount: {
      type: DataTypes.FLOAT,
      allowNull: false,
    },
    TransactionDate: {
      type: DataTypes.DATE,
      defaultValue: DataTypes.NOW,
    },
  },
  {
    sequelize,
    modelName: "Transaction",
  }
);

Transaction.belongsTo(Wallet, { foreignKey: "WalletID" });

module.exports = Transaction;
