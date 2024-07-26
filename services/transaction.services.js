const { NotFoundError } = require("../errors/customsErrors");
const TRANSACTION_MODELS = require("../models/transaction.models");

const TRANSACTION_SERVICES = {
  getAllTransaction: async () => {
    const result = await TRANSACTION_MODELS.getAllTransaction();

    return result;
  },

  getDetailTransaction: async (id) => {
    const result = await TRANSACTION_MODELS.getDetailTransaction(id);

    if (!result) {
      throw new NotFoundError("Transaction not found");
    }

    return result;
  },
};

module.exports = TRANSACTION_SERVICES;
