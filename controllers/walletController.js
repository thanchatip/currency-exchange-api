const Wallet = require("../models/Wallet");

async function createWallet(req, res) {
  const { UserID, CryptoCurrencyID, Balance } = req.body;
  try {
    const wallet = await Wallet.create({ UserID, CryptoCurrencyID, Balance });
    res.status(201).json(wallet);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}

async function getAllWallets(req, res) {
  try {
    const wallets = await Wallet.findAll();
    res.json(wallets);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}

async function getWalletById(req, res) {
  try {
    const wallet = await Wallet.findByPk(req.params.id);
    if (wallet) {
      res.json(wallet);
    } else {
      res.status(404).json({ message: "Wallet not found" });
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}

async function updateWallet(req, res) {
  try {
    const wallet = await Wallet.findByPk(req.params.id);
    if (wallet) {
      await wallet.update(req.body);
      res.json(wallet);
    } else {
      res.status(404).json({ message: "Wallet not found" });
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}

async function deleteWallet(req, res) {
  try {
    const wallet = await Wallet.findByPk(req.params.id);
    if (wallet) {
      await wallet.destroy();
      res.json({ message: "Wallet deleted" });
    } else {
      res.status(404).json({ message: "Wallet not found" });
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}

module.exports = {
  createWallet,
  getAllWallets,
  getWalletById,
  updateWallet,
  deleteWallet,
};
