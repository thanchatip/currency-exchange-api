const express = require("express");
const router = express.Router();
const walletController = require("../controllers/walletController");

router.post("/", walletController.createWallet);
router.get("/", walletController.getAllWallets);
router.get("/:id", walletController.getWalletById);
router.put("/:id", walletController.updateWallet);
router.delete("/:id", walletController.deleteWallet);

module.exports = router;
