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
    const data = req.body;

    const result = await ACCOUNT_SERVICES.createAccount(data);

    res.status(201).json({
      success: true,
      message: "Account created successfully",
      data: result,
    });
  } catch (error) {
    next(error);
  }
};

updateAccount = async (req, res, next) => {
  try {
    const { id } = req.params;
    const data = req.body;

    const result = await ACCOUNT_SERVICES.updateAccount(id, data);

    res.status(200).json({
      success: true,
      message: "Account updated successfully",
      data: result,
    });
  } catch (error) {
    next(error);
  }
};

deleteAccount = async (req, res, next) => {
  try {
    const { id } = req.params;

    const result = await ACCOUNT_SERVICES.deleteAccount(id);

    res.status(200).json({
      success: true,
      message: "Account deleted successfully",
    });
  } catch (error) {
    next(error);
  }
};

module.exports = { getAllAccount, getDetailAccount, createAccount, updateAccount, deleteAccount };
