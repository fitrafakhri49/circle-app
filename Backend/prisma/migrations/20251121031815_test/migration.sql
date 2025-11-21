/*
  Warnings:

  - Changed the type of `updated_by` on the `threads` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.
  - Changed the type of `created_by` on the `threads` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.
  - Added the required column `created_by` to the `users` table without a default value. This is not possible if the table is not empty.
  - Added the required column `updated_by` to the `users` table without a default value. This is not possible if the table is not empty.

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
ALTER TABLE "threads" DROP COLUMN "updated_by",
ADD COLUMN     "updated_by" INTEGER NOT NULL,
DROP COLUMN "created_by",
ADD COLUMN     "created_by" INTEGER NOT NULL;

-- AlterTable
ALTER TABLE "users" DROP COLUMN "created_by",
ADD COLUMN     "created_by" INTEGER NOT NULL,
DROP COLUMN "updated_by",
ADD COLUMN     "updated_by" INTEGER NOT NULL;

-- AddForeignKey
ALTER TABLE "users" ADD CONSTRAINT "users_created_by_fkey" FOREIGN KEY ("created_by") REFERENCES "users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "users" ADD CONSTRAINT "users_updated_by_fkey" FOREIGN KEY ("updated_by") REFERENCES "users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "threads" ADD CONSTRAINT "threads_created_by_fkey" FOREIGN KEY ("created_by") REFERENCES "users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "threads" ADD CONSTRAINT "threads_updated_by_fkey" FOREIGN KEY ("updated_by") REFERENCES "users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
