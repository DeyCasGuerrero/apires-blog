-- CreateTable
CREATE TABLE "BlogOnCategory" (
    "blogId" TEXT NOT NULL,
    "categoryId" INTEGER NOT NULL,

    CONSTRAINT "BlogOnCategory_pkey" PRIMARY KEY ("blogId","categoryId")
);

-- AddForeignKey
ALTER TABLE "BlogOnCategory" ADD CONSTRAINT "BlogOnCategory_blogId_fkey" FOREIGN KEY ("blogId") REFERENCES "Blog"("idBlog") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "BlogOnCategory" ADD CONSTRAINT "BlogOnCategory_categoryId_fkey" FOREIGN KEY ("categoryId") REFERENCES "Category"("idCategory") ON DELETE RESTRICT ON UPDATE CASCADE;
