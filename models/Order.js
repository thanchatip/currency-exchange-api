const { Model, DataTypes } = require("sequelize");
const sequelize = require("../config/database");
const User = require("./User");
const CryptoCurrency = require("./CryptoCurrency");
const FiatCurrency = require("./FiatCurrency");

class Order extends Model {}

Order.init(
  {
    OrderID: {
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
    FiatCurrencyID: {
      type: DataTypes.INTEGER,
      references: {
        model: FiatCurrency,
        key: "FiatCurrencyID",
      },
      allowNull: false,
    },
    OrderType: {
      type: DataTypes.ENUM,
      values: ["Buy", "Sell"],
      allowNull: false,
    },
    OrderStatus: {
      type: DataTypes.ENUM,
      values: ["Pending", "Completed", "Canceled"],
      defaultValue: "Pending",
    },
    OrderAmount: {
      type: DataTypes.FLOAT,
      allowNull: false,
    },
    OrderPrice: {
      type: DataTypes.FLOAT,
      allowNull: false,
    },
    OrderDate: {
      type: DataTypes.DATE,
      defaultValue: DataTypes.NOW,
    },
  },
  {
    sequelize,
    modelName: "Order",
  }
);

Order.belongsTo(User, { foreignKey: "UserID" });
Order.belongsTo(CryptoCurrency, { foreignKey: "CryptoCurrencyID" });
Order.belongsTo(FiatCurrency, { foreignKey: "FiatCurrencyID" });

module.exports = Order;
