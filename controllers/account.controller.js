const ACCOUNT_MODELS = require("../models/account.models");
const ACCOUNT_SERVICES = require("../services/account.services");

getAllAccount = async (req, res, next) => {
  try {
    const result = await ACCOUNT_SERVICES.getAllAccount();
    res.status(200).json({
      success: true,
      message: "All bank accounts fetched successfully",
      data: result,
    });
  } catch (error) {
    next(error);
  }
};

getDetailAccount = async (req, res, next) => {
  try {
    const { id } = req.params;

    const result = await ACCOUNT_SERVICES.getDetailAccount(id);

    res.status(200).json({
      success: true,
      message: "Detail bank account fetched successfully",
      data: result,
    });
  } catch (error) {
    next(error);
  }
};

createAccount = async (req, res, next) => {
  try {
    const { bank_name, pin, balance, user_id } = req.body;
    if (!bank_name || !pin || balance === undefined || !user_id) {
      throw new BadRequest("Missing required fields");
    }

    console.log(bank_name, pin, balance, user_id);
    const result = await ACCOUNT_MODELS.createAccount({
      bank_name,
      pin,
      balance,
      user_id,
    });

    res.status(201).json({
      success: true,
      message: "Account created successfully",
      data: result,
    });
  } catch (error) {
    next(error);
  }
};

module.exports = { getAllAccount, getDetailAccount, createAccount };
