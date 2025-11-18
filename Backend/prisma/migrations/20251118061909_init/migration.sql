/*
  Warnings:

  - You are about to drop the column `usersId` on the `threads` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE "replies" DROP CONSTRAINT "replies_thread_id_fkey";

-- DropForeignKey
ALTER TABLE "threads" DROP CONSTRAINT "threads_usersId_fkey";

-- AlterTable
ALTER TABLE "threads" DROP COLUMN "usersId";

-- AddForeignKey
ALTER TABLE "threads" ADD CONSTRAINT "threads_number_of_replies_fkey" FOREIGN KEY ("number_of_replies") REFERENCES "replies"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "threads" ADD CONSTRAINT "threads_updated_by_fkey" FOREIGN KEY ("updated_by") REFERENCES "users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
