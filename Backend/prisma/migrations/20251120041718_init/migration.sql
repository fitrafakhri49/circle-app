/*
  Warnings:

  - A unique constraint covering the columns `[username]` on the table `users` will be added. If there are existing duplicate values, this will fail.

*/
-- DropForeignKey
ALTER TABLE "threads" DROP CONSTRAINT "threads_created_by_fkey";

-- DropForeignKey
ALTER TABLE "threads" DROP CONSTRAINT "threads_updated_by_fkey";

-- DropForeignKey
ALTER TABLE "users" DROP CONSTRAINT "users_created_by_fkey";

-- DropForeignKey
ALTER TABLE "users" DROP CONSTRAINT "users_updated_by_fkey";

-- AlterTable
ALTER TABLE "threads" ALTER COLUMN "updated_by" SET DATA TYPE TEXT,
ALTER COLUMN "created_by" SET DATA TYPE TEXT;

-- AlterTable
ALTER TABLE "users" ALTER COLUMN "created_by" SET DATA TYPE TEXT,
ALTER COLUMN "updated_by" SET DATA TYPE TEXT;

-- CreateIndex
CREATE UNIQUE INDEX "users_username_key" ON "users"("username");

-- AddForeignKey
ALTER TABLE "users" ADD CONSTRAINT "users_created_by_fkey" FOREIGN KEY ("created_by") REFERENCES "users"("username") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "users" ADD CONSTRAINT "users_updated_by_fkey" FOREIGN KEY ("updated_by") REFERENCES "users"("username") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "threads" ADD CONSTRAINT "threads_created_by_fkey" FOREIGN KEY ("created_by") REFERENCES "users"("username") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "threads" ADD CONSTRAINT "threads_updated_by_fkey" FOREIGN KEY ("updated_by") REFERENCES "users"("username") ON DELETE RESTRICT ON UPDATE CASCADE;
