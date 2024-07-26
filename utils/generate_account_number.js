const prisma = require("../config/prisma");

const generateAccountNumber = async () => {
  const lastAccount = await prisma.bank_Accounts.findFirst({
    orderBy: { bank_account_number: "desc" },
    select: { bank_account_number: true },
  });

  let newAccountNumber = "1234500000";

  if (lastAccount) {
    newAccountNumber = (parseInt(lastAccount.bank_account_number) + 1).toString().padStart(10, "0");
  }

  return newAccountNumber;
};

module.exports = generateAccountNumber;
