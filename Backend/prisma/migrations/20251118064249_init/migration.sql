-- DropForeignKey
ALTER TABLE "threads" DROP CONSTRAINT "threads_created_by_fkey";

-- DropForeignKey
ALTER TABLE "threads" DROP CONSTRAINT "threads_updated_by_fkey";

-- DropForeignKey
ALTER TABLE "users" DROP CONSTRAINT "users_created_by_fkey";

-- DropForeignKey
ALTER TABLE "users" DROP CONSTRAINT "users_updated_by_fkey";

-- AlterTable
ALTER TABLE "threads" ALTER COLUMN "updated_by" DROP NOT NULL,
ALTER COLUMN "created_by" DROP NOT NULL;
