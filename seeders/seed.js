const sequelize = require("../config/database");
const User = require("../models/User");
const FiatCurrency = require("../models/FiatCurrency");
const CryptoCurrency = require("../models/CryptoCurrency");
const Wallet = require("../models/Wallet");
const Order = require("../models/Order");
const Transaction = require("../models/Transaction");

const seedDatabase = async () => {
  await sequelize.sync({ force: true });

  const users = await User.bulkCreate([
    {
      Username: "user1",
      Password: "password1",
      Email: "user1@example.com",
      Phone: "1234567890",
    },
    {
      Username: "user2",
      Password: "password2",
      Email: "user2@example.com",
      Phone: "0987654321",
    },
  ]);

  const fiatCurrencies = await FiatCurrency.bulkCreate([
    { FiatCurrencyCode: "USD", FiatCurrencyName: "United States Dollar" },
    { FiatCurrencyCode: "THB", FiatCurrencyName: "Thai Baht" },
  ]);

  const cryptoCurrencies = await CryptoCurrency.bulkCreate([
    { CryptoCurrencyCode: "BTC", CryptoCurrencyName: "Bitcoin" },
    { CryptoCurrencyCode: "ETH", CryptoCurrencyName: "Ethereum" },
    { CryptoCurrencyCode: "XRP", CryptoCurrencyName: "Ripple" },
    { CryptoCurrencyCode: "DOGE", CryptoCurrencyName: "Dogecoin" },
  ]);

  const wallets = await Wallet.bulkCreate([
    {
      UserID: users[0].UserID,
      CryptoCurrencyID: cryptoCurrencies[0].CryptoCurrencyID,
      Balance: 1.5,
    },
    {
      UserID: users[1].UserID,
      CryptoCurrencyID: cryptoCurrencies[1].CryptoCurrencyID,
      Balance: 10.0,
    },
  ]);

  const orders = await Order.bulkCreate([
    {
      UserID: users[0].UserID,
      CryptoCurrencyID: cryptoCurrencies[0].CryptoCurrencyID,
      FiatCurrencyID: fiatCurrencies[0].FiatCurrencyID,
      OrderType: "Buy",
      OrderAmount: 0.1,
      OrderPrice: 30000,
    },
    {
      UserID: users[1].UserID,
      CryptoCurrencyID: cryptoCurrencies[1].CryptoCurrencyID,
      FiatCurrencyID: fiatCurrencies[1].FiatCurrencyID,
      OrderType: "Sell",
      OrderAmount: 5.0,
      OrderPrice: 2000,
    },
  ]);

  const transactions = await Transaction.bulkCreate([
    { WalletID: wallets[0].WalletID, TransactionType: "Deposit", Amount: 0.5 },
    {
      WalletID: wallets[1].WalletID,
      TransactionType: "Withdrawal",
      Amount: 2.0,
    },
  ]);

  console.log("Database seeded successfully");
};

seedDatabase().catch((err) => {
  console.error("Failed to seed database:", err);
});
