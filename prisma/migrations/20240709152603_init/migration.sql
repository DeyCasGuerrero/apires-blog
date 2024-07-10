-- CreateEnum
CREATE TYPE "Role" AS ENUM ('ADMIN', 'USER');

-- AlterTable
ALTER TABLE "User" ADD COLUMN     "role" "Role" NOT NULL DEFAULT 'USER';

-- CreateTable
CREATE TABLE "News" (
    "idNews" SERIAL NOT NULL,
    "title" TEXT NOT NULL,
    "content" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3),

    CONSTRAINT "News_pkey" PRIMARY KEY ("idNews")
);

-- CreateTable
CREATE TABLE "UserOnNews" (
    "authorEmail" TEXT NOT NULL,
    "newsId" INTEGER NOT NULL,

    CONSTRAINT "UserOnNews_pkey" PRIMARY KEY ("authorEmail","newsId")
);

-- AddForeignKey
ALTER TABLE "UserOnNews" ADD CONSTRAINT "UserOnNews_authorEmail_fkey" FOREIGN KEY ("authorEmail") REFERENCES "User"("email") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "UserOnNews" ADD CONSTRAINT "UserOnNews_newsId_fkey" FOREIGN KEY ("newsId") REFERENCES "News"("idNews") ON DELETE RESTRICT ON UPDATE CASCADE;
