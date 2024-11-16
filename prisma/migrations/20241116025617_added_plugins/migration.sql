/*
  Warnings:

  - You are about to drop the `VideoEmbed` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "VideoEmbed" DROP CONSTRAINT "VideoEmbed_postId_fkey";

-- DropTable
DROP TABLE "VideoEmbed";

-- CreateTable
CREATE TABLE "PluginData" (
    "id" SERIAL NOT NULL,
    "type" TEXT NOT NULL,
    "data" JSONB NOT NULL,
    "postId" INTEGER NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "PluginData_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "PluginData" ADD CONSTRAINT "PluginData_postId_fkey" FOREIGN KEY ("postId") REFERENCES "Post"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
