const express = require("express");
const bodyParser = require("body-parser");
const sequelize = require("./config/database");

const userRoutes = require("./routes/userRoutes");
const orderRoutes = require("./routes/orderRoutes");
const walletRoutes = require("./routes/walletRoutes");
const transactionRoutes = require("./routes/transactionRoutes");

const app = express();

app.use(bodyParser.json());

app.use("/api/users", userRoutes);
app.use("/api/orders", orderRoutes);
app.use("/api/wallets", walletRoutes);
app.use("/api/transactions", transactionRoutes);

sequelize
  .sync()
  .then(() => {
    console.log("Database synced");
    app.listen(3000, () => {
      console.log("Server is running on port 3000");
    });
  })
  .catch((err) => {
    console.error("Unable to sync database:", err);
  });

module.exports = app;
