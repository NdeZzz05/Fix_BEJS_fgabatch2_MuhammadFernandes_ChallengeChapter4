const prisma = require("../config/prisma");
const generateAccountNumber = require("../utils/generate_account_number");

const ACCOUNT_MODELS = {
  getAllAccount: async () => {
    const result = await prisma.bank_Accounts.findMany({
      select: {
        id: true,
        bank_name: true,
        bank_account_number: true,
        balance: true,
        user_id: true,
      },
    });
    return result;
  },

  getDetailAccount: async (id) => {
    const result = await prisma.bank_Accounts.findUnique({
      where: { id },
      select: {
        id: true,
        bank_name: true,
        bank_account_number: true,
        balance: true,
        user_id: true,
        user: {
          select: {
            id: true,
            name: true,
            email: true,
          },
        },
        transactions_source: true,
        transactions_target: true,
      },
    });
    return result;
  },

  createAccount: async (data) => {
    const { bank_name, pin, balance, user_id } = data;

    const newAccountNumber = await generateAccountNumber();

    const result = await prisma.bank_Accounts.create({
      data: {
        bank_name,
        bank_account_number: newAccountNumber,
        pin,
        balance,
        user_id,
      },
    });
    return result;
  },

  updateAccount: async (id, data) => {
    const { bank_name, pin } = data;

    const result = await prisma.bank_Accounts.update({
      where: { id },
      data: {
        bank_name,
        pin,
      },
    });
    return result;
  },

  deleteAccount: async (id) => {
    const result = await prisma.bank_Accounts.delete({ where: { id } });
    return result;
  },
};

module.exports = ACCOUNT_MODELS;
