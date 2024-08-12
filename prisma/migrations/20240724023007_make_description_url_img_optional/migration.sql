-- DropForeignKey
ALTER TABLE "NewsOnCate" DROP CONSTRAINT "NewsOnCate_idCategory_fkey";

-- DropForeignKey
ALTER TABLE "NewsOnCate" DROP CONSTRAINT "NewsOnCate_newsId_fkey";

-- DropForeignKey
ALTER TABLE "Profile" DROP CONSTRAINT "Profile_userEmail_fkey";

-- DropForeignKey
ALTER TABLE "UserOnNews" DROP CONSTRAINT "UserOnNews_authorEmail_fkey";

-- DropForeignKey
ALTER TABLE "UserOnNews" DROP CONSTRAINT "UserOnNews_newsId_fkey";

-- AlterTable
ALTER TABLE "Profile" ADD COLUMN     "urlImg" TEXT,
ALTER COLUMN "description" DROP NOT NULL;

-- AddForeignKey
ALTER TABLE "Profile" ADD CONSTRAINT "Profile_userEmail_fkey" FOREIGN KEY ("userEmail") REFERENCES "User"("email") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "NewsOnCate" ADD CONSTRAINT "NewsOnCate_newsId_fkey" FOREIGN KEY ("newsId") REFERENCES "News"("idNews") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "NewsOnCate" ADD CONSTRAINT "NewsOnCate_idCategory_fkey" FOREIGN KEY ("idCategory") REFERENCES "NewsCategory"("idCaNews") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "UserOnNews" ADD CONSTRAINT "UserOnNews_authorEmail_fkey" FOREIGN KEY ("authorEmail") REFERENCES "User"("email") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "UserOnNews" ADD CONSTRAINT "UserOnNews_newsId_fkey" FOREIGN KEY ("newsId") REFERENCES "News"("idNews") ON DELETE CASCADE ON UPDATE CASCADE;
