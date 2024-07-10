/*
  Warnings:

  - You are about to drop the `newsOnCate` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "newsOnCate" DROP CONSTRAINT "newsOnCate_idCategory_fkey";

-- DropForeignKey
ALTER TABLE "newsOnCate" DROP CONSTRAINT "newsOnCate_newsId_fkey";

-- AlterTable
ALTER TABLE "User" ADD COLUMN     "country" TEXT NOT NULL DEFAULT 'Unknown';

-- DropTable
DROP TABLE "newsOnCate";

-- CreateTable
CREATE TABLE "NewsOnCate" (
    "newsId" INTEGER NOT NULL,
    "idCategory" INTEGER NOT NULL,

    CONSTRAINT "NewsOnCate_pkey" PRIMARY KEY ("newsId","idCategory")
);

-- AddForeignKey
ALTER TABLE "NewsOnCate" ADD CONSTRAINT "NewsOnCate_newsId_fkey" FOREIGN KEY ("newsId") REFERENCES "News"("idNews") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "NewsOnCate" ADD CONSTRAINT "NewsOnCate_idCategory_fkey" FOREIGN KEY ("idCategory") REFERENCES "NewsCategory"("idCaNews") ON DELETE RESTRICT ON UPDATE CASCADE;
