-- DropForeignKey
ALTER TABLE "BlogOnCategory" DROP CONSTRAINT "BlogOnCategory_blogId_fkey";

-- DropForeignKey
ALTER TABLE "BlogOnCategory" DROP CONSTRAINT "BlogOnCategory_categoryId_fkey";

-- AddForeignKey
ALTER TABLE "BlogOnCategory" ADD CONSTRAINT "BlogOnCategory_blogId_fkey" FOREIGN KEY ("blogId") REFERENCES "Blog"("idBlog") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "BlogOnCategory" ADD CONSTRAINT "BlogOnCategory_categoryId_fkey" FOREIGN KEY ("categoryId") REFERENCES "Category"("idCategory") ON DELETE CASCADE ON UPDATE CASCADE;
