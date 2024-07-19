const Transaction = require("../models/Transaction");

async function createTransaction(req, res) {
  const { WalletID, TransactionType, Amount } = req.body;
  try {
    const transaction = await Transaction.create({
      WalletID,
      TransactionType,
      Amount,
    });
    res.status(201).json(transaction);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}

async function getAllTransactions(req, res) {
  try {
    const transactions = await Transaction.findAll();
    res.json(transactions);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}

async function getTransactionById(req, res) {
  try {
    const transaction = await Transaction.findByPk(req.params.id);
    if (transaction) {
      res.json(transaction);
    } else {
      res.status(404).json({ message: "Transaction not found" });
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}

async function updateTransaction(req, res) {
  try {
    const transaction = await Transaction.findByPk(req.params.id);
    if (transaction) {
      await transaction.update(req.body);
      res.json(transaction);
    } else {
      res.status(404).json({ message: "Transaction not found" });
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}

async function deleteTransaction(req, res) {
  try {
    const transaction = await Transaction.findByPk(req.params.id);
    if (transaction) {
      await transaction.destroy();
      res.json({ message: "Transaction deleted" });
    } else {
      res.status(404).json({ message: "Transaction not found" });
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}

module.exports = {
  createTransaction,
  getAllTransactions,
  getTransactionById,
  updateTransaction,
  deleteTransaction,
};
