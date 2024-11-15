/*
  Warnings:

  - You are about to drop the column `Content` on the `Post` table. All the data in the column will be lost.
  - You are about to drop the column `Slug` on the `Post` table. All the data in the column will be lost.
  - Added the required column `slug` to the `Post` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Post" DROP COLUMN "Content",
DROP COLUMN "Slug",
ADD COLUMN     "content" TEXT,
ADD COLUMN     "slug" TEXT NOT NULL;
