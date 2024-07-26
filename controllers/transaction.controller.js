const { BadRequest, NotFoundError } = require("../errors/customsErrors");
const TRANSACTION_MODELS = require("../models/transaction.models");

getAllTransaction = async (req, res, next) => {
  try {
    const result = await TRANSACTION_MODELS.getAllTransaction();
    res.status(200).json({
      success: true,
      message: "Transactions fetched successfully",
      data: result,
    });
  } catch (error) {
    next(error);
  }
};

getDetailTransaction = async (req, res, next) => {
  try {
    const { id } = req.params;
    const result = await TRANSACTION_MODELS.getDetailTransaction(id);

    if (!result) throw new NotFoundError("Transaction not found");

    res.status(200).json({
      success: true,
      message: "Detail transactions fetched successfully",
      data: result,
    });
  } catch (error) {
    next(error);
  }
};

createTransfer = async (req, res, next) => {
  try {
    const { amount, source_account_id, destination_account_id, transaction_type_id } = req.body;
    if (!amount || !source_account_id || !destination_account_id) {
      throw new BadRequest("Missing required fields");
    }

    const result = await TRANSACTION_MODELS.createTransfer({
      amount,
      source_account_id,
      destination_account_id,
      transaction_type_id,
    });

    console.log(result);

    res.status(201).json({
      success: true,
      message: "Transaction created successfully",
      data: result,
    });
  } catch (error) {
    next(error);
  }
};

createDeposit = async (req, res, next) => {
  try {
    const { amount, destination_account_id, transaction_type_id } = req.body;
    if (!amount || !destination_account_id) {
      throw new BadRequest("Missing required fields");
    }

    const result = await TRANSACTION_MODELS.createDeposit(amount, destination_account_id, transaction_type_id);

    res.status(201).json({
      success: true,
      message: "Cash deposit created successfully",
      data: result,
    });
  } catch (error) {
    next(error);
  }
};

createWithdraw = async (req, res, next) => {
  try {
    const { amount, source_account_id, transaction_type_id } = req.body;

    const result = await TRANSACTION_MODELS.createWithdraw(amount, source_account_id, transaction_type_id);

    res.status(201).json({
      success: true,
      message: "Cash withdrawal created successfully",
      data: result,
    });
  } catch (error) {
    next(error);
  }
};

module.exports = { getAllTransaction, getDetailTransaction, createTransfer, createDeposit, createWithdraw };
