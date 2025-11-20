/*
  Warnings:

  - A unique constraint covering the columns `[thread_id,user_id]` on the table `likes` will be added. If there are existing duplicate values, this will fail.

*/
-- DropIndex
DROP INDEX "likes_thread_id_key";

-- DropIndex
DROP INDEX "likes_user_id_key";

-- CreateIndex
CREATE UNIQUE INDEX "likes_thread_id_user_id_key" ON "likes"("thread_id", "user_id");
