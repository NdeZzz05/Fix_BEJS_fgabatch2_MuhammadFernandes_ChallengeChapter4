const prisma = require("../config/prisma");
const { NotFoundError, BadRequest } = require("../errors/customsErrors");
const ACCOUNT_MODELS = require("../models/account.models");

const ACCOUNT_SERVICES = {
  getAllAccount: async () => {
    const result = await ACCOUNT_MODELS.getAllAccount();
    return result;
  },

  getDetailAccount: async (id) => {
    const result = await ACCOUNT_MODELS.getDetailAccount(id);
    if (!result) {
      throw new NotFoundError("Account not found");
    }
    return result;
  },

  createAccount: async (data) => {
    if (!data.bank_name || !data.pin || data.balance === undefined || !data.user_id) {
      throw new BadRequest("Missing required fields");
    }

    const result = await ACCOUNT_MODELS.createAccount(data);
    return result;
  },

  updateAccount: async (id, data) => {
    if (!data.bank_name || !data.pin) {
      throw new BadRequest("Missing required fields");
    }

    const result = await ACCOUNT_MODELS.updateAccount(id, data);
    if (!result) {
      throw new NotFoundError("Account not found");
    }
    return result;
  },

  deleteAccount: async (id) => {
    const checkAccount = await prisma.bank_Accounts.findUnique({
      where: { id },
    });

    if (!checkAccount) {
      throw new NotFoundError("Account not found");
    }

    try {
      const result = await ACCOUNT_MODELS.deleteAccount(id);
      return result;
    } catch (error) {
      return error;
    }
  },
};

module.exports = ACCOUNT_SERVICES;
