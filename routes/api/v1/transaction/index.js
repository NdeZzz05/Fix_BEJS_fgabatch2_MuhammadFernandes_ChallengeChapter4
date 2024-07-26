var express = require("express");
var router = express.Router();

const TRANSACTION_CONTROLLER = require("../../../../controllers/transaction.controller");

router.get("/", TRANSACTION_CONTROLLER.getAllTransaction);
router.get("/:id", TRANSACTION_CONTROLLER.getDetailTransaction);
router.post("/transfer", TRANSACTION_CONTROLLER.createTransfer);
router.post("/deposit", TRANSACTION_CONTROLLER.createDeposit);
router.post("/withdraw", TRANSACTION_CONTROLLER.createWithdraw);

module.exports = router;
