const prisma = require("../config/prisma");
const { BadRequest } = require("../errors/customsErrors");

const TRANSACTION_MODELS = {
  getAllTransaction: async () => {
    try {
      const result = await prisma.transactions.findMany();
      return result;
    } catch (error) {
      return error;
    }
  },

  getDetailTransaction: async (id) => {
    try {
      const result = await prisma.transactions.findUnique({
        where: { id },
        include: {
          sourceAccount: true,
          destinationAccount: true,
        },
      });

      return result;
    } catch (error) {
      return error;
    }
  },

  createTransfer: async (data) => {
    try {
      const { amount, source_account_id, destination_account_id, transaction_type_id } = data;

      // Start a transaction to ensure data consistency
      const result = await prisma.$transaction(async (prisma) => {
        const sourceAccount = await prisma.bank_Accounts.findUnique({
          where: { id: source_account_id },
        });

        if (!sourceAccount) {
          return { error: new NotFoundError("Source account not found") };
        }

        if (sourceAccount.balance < amount) {
          throw new BadRequest("Insufficient balance");
        }

        const updatedSourceAccount = await prisma.bank_Accounts.update({
          where: { id: source_account_id },
          data: { balance: { decrement: amount } },
        });

        const destinationAccount = await prisma.bank_Accounts.findUnique({
          where: { id: destination_account_id },
        });

        if (!destinationAccount) {
          throw new NotFoundError("Destination account not found");
        }

        const updatedDestinationAccount = await prisma.bank_Accounts.update({
          where: { id: destination_account_id },
          data: { balance: { increment: amount } },
        });

        const transaction = await prisma.transactions.create({
          data: {
            amount,
            source_account_id,
            destination_account_id,
            transaction_type_id,
          },
        });

        return transaction;
      });

      return result;
    } catch (error) {
      return error;
    }
  },

  createDeposit: async (amount, destination_account_id, transaction_type_id) => {
    try {
      const result = await prisma.$transaction(async (prisma) => {
        const updatedDestinationAccount = await prisma.bank_Accounts.update({
          where: { id: destination_account_id },
          data: { balance: { increment: amount } },
        });

        const transaction = await prisma.transactions.create({
          data: {
            amount,
            source_account_id: null, // Tidak ada akun sumber untuk setoran tunai
            destination_account_id,
            transaction_type_id,
          },
        });

        return transaction;
      });

      return result;
    } catch (error) {
      return error;
    }
  },

  createWithdraw: async (amount, source_account_id, transaction_type_id) => {
    try {
      const result = await prisma.$transaction(async (prisma) => {
        const updatedSourceAccount = await prisma.bank_Accounts.update({
          where: { id: source_account_id },
          data: { balance: { decrement: amount } },
        });

        const transaction = await prisma.transactions.create({
          data: {
            amount,
            source_account_id,
            destination_account_id: null, // Tidak ada akun tujuan pengambilan tunai
            transaction_type_id,
          },
        });
        return transaction;
      });
      return result;
    } catch (error) {
      return error;
    }
  },
};

module.exports = TRANSACTION_MODELS;
