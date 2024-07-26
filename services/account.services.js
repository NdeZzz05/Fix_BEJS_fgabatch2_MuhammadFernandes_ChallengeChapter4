const { NotFoundError } = require("../errors/customsErrors");
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
};

module.exports = ACCOUNT_SERVICES;
