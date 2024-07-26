-- DropForeignKey
ALTER TABLE "Profiles" DROP CONSTRAINT "Profiles_user_id_fkey";

-- AddForeignKey
ALTER TABLE "Profiles" ADD CONSTRAINT "Profiles_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "Users"("id") ON DELETE CASCADE ON UPDATE CASCADE;
