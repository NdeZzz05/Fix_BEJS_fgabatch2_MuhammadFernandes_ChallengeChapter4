-- CreateEnum
CREATE TYPE "IdentityType" AS ENUM ('KTP', 'SIM', 'PASSPORT', 'STUDENT_CARD');

-- CreateTable
CREATE TABLE "Users" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "password" TEXT NOT NULL,

    CONSTRAINT "Users_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Profiles" (
    "id" TEXT NOT NULL,
    "identity_type" "IdentityType" NOT NULL,
    "identity_number" TEXT NOT NULL,
    "user_id" TEXT NOT NULL,
    "address_id" TEXT,
    "job_id" TEXT,

    CONSTRAINT "Profiles_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Addresses" (
    "id" TEXT NOT NULL,
    "street" TEXT NOT NULL,
    "city" TEXT NOT NULL,
    "state" TEXT NOT NULL,
    "postal_code" TEXT NOT NULL,
    "country" TEXT NOT NULL,

    CONSTRAINT "Addresses_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Jobs" (
    "id" TEXT NOT NULL,
    "company_name" TEXT NOT NULL,
    "position" TEXT NOT NULL,

    CONSTRAINT "Jobs_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Users_email_key" ON "Users"("email");

-- CreateIndex
CREATE UNIQUE INDEX "Profiles_identity_number_key" ON "Profiles"("identity_number");

-- CreateIndex
CREATE UNIQUE INDEX "Profiles_user_id_key" ON "Profiles"("user_id");

-- AddForeignKey
ALTER TABLE "Profiles" ADD CONSTRAINT "Profiles_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "Users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Profiles" ADD CONSTRAINT "Profiles_address_id_fkey" FOREIGN KEY ("address_id") REFERENCES "Addresses"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Profiles" ADD CONSTRAINT "Profiles_job_id_fkey" FOREIGN KEY ("job_id") REFERENCES "Jobs"("id") ON DELETE SET NULL ON UPDATE CASCADE;
