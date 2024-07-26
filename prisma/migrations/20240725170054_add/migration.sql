-- CreateTable
CREATE TABLE "Bank_Accounts" (
    "id" TEXT NOT NULL,
    "bank_name" TEXT NOT NULL,
    "bank_account_number" TEXT NOT NULL,
    "pin" TEXT NOT NULL,
    "balance" DOUBLE PRECISION NOT NULL,
    "user_id" TEXT NOT NULL,

    CONSTRAINT "Bank_Accounts_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Transactions" (
    "id" TEXT NOT NULL,
    "amount" DOUBLE PRECISION NOT NULL,
    "transaction_type_id" TEXT NOT NULL,
    "source_account_id" TEXT,
    "destination_account_id" TEXT,

    CONSTRAINT "Transactions_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Transaction_Type" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,

    CONSTRAINT "Transaction_Type_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Bank_Accounts_bank_account_number_key" ON "Bank_Accounts"("bank_account_number");

-- CreateIndex
CREATE UNIQUE INDEX "Bank_Accounts_user_id_key" ON "Bank_Accounts"("user_id");

-- CreateIndex
CREATE UNIQUE INDEX "Transactions_transaction_type_id_key" ON "Transactions"("transaction_type_id");

-- AddForeignKey
ALTER TABLE "Bank_Accounts" ADD CONSTRAINT "Bank_Accounts_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "Users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Transactions" ADD CONSTRAINT "Transactions_transaction_type_id_fkey" FOREIGN KEY ("transaction_type_id") REFERENCES "Transaction_Type"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Transactions" ADD CONSTRAINT "Transactions_source_account_id_fkey" FOREIGN KEY ("source_account_id") REFERENCES "Bank_Accounts"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Transactions" ADD CONSTRAINT "Transactions_destination_account_id_fkey" FOREIGN KEY ("destination_account_id") REFERENCES "Bank_Accounts"("id") ON DELETE SET NULL ON UPDATE CASCADE;
