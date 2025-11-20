/*
  Warnings:

  - A unique constraint covering the columns `[thread_id]` on the table `likes` will be added. If there are existing duplicate values, this will fail.

*/
-- AlterTable
ALTER TABLE "likes" ALTER COLUMN "updated_by" DROP NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "likes_thread_id_key" ON "likes"("thread_id");
