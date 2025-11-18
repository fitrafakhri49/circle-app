/*
  Warnings:

  - You are about to drop the column `createdBy` on the `threads` table. All the data in the column will be lost.
  - The `updated_at` column on the `threads` table would be dropped and recreated. This will lead to data loss if there is data in the column.
  - You are about to drop the column `usersId` on the `users` table. All the data in the column will be lost.
  - You are about to drop the `following` table. If the table is not empty, all the data it contains will be lost.
  - Added the required column `created_by` to the `threads` table without a default value. This is not possible if the table is not empty.
  - Added the required column `usersId` to the `threads` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "following" DROP CONSTRAINT "following_followers_id_fkey";

-- DropForeignKey
ALTER TABLE "following" DROP CONSTRAINT "following_following_id_fkey";

-- DropForeignKey
ALTER TABLE "threads" DROP CONSTRAINT "threads_createdBy_fkey";

-- AlterTable
ALTER TABLE "replies" ALTER COLUMN "image" SET DATA TYPE TEXT;

-- AlterTable
ALTER TABLE "threads" DROP COLUMN "createdBy",
ADD COLUMN     "created_by" INTEGER NOT NULL,
ADD COLUMN     "usersId" INTEGER NOT NULL,
DROP COLUMN "updated_at",
ADD COLUMN     "updated_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP;

-- AlterTable
ALTER TABLE "users" DROP COLUMN "usersId",
ADD COLUMN     "created_by" INTEGER,
ADD COLUMN     "updated_by" INTEGER;

-- DropTable
DROP TABLE "following";

-- CreateTable
CREATE TABLE "follow" (
    "id" SERIAL NOT NULL,
    "following_id" INTEGER NOT NULL,
    "followers_id" INTEGER NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "follow_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "users" ADD CONSTRAINT "users_created_by_fkey" FOREIGN KEY ("created_by") REFERENCES "users"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "users" ADD CONSTRAINT "users_updated_by_fkey" FOREIGN KEY ("updated_by") REFERENCES "users"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "threads" ADD CONSTRAINT "threads_created_by_fkey" FOREIGN KEY ("created_by") REFERENCES "users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "threads" ADD CONSTRAINT "threads_usersId_fkey" FOREIGN KEY ("usersId") REFERENCES "users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "follow" ADD CONSTRAINT "follow_following_id_fkey" FOREIGN KEY ("following_id") REFERENCES "users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "follow" ADD CONSTRAINT "follow_followers_id_fkey" FOREIGN KEY ("followers_id") REFERENCES "users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
