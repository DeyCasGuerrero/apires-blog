-- CreateEnum
CREATE TYPE "Role" AS ENUM ('ADMIN', 'USER');

-- CreateTable
CREATE TABLE "Profile" (
    "idProfile" SERIAL NOT NULL,
    "description" TEXT NOT NULL,
    "userEmail" TEXT NOT NULL,

    CONSTRAINT "Profile_pkey" PRIMARY KEY ("idProfile")
);

-- CreateTable
CREATE TABLE "User" (
    "idUser" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "password" TEXT NOT NULL,
    "country" TEXT NOT NULL,
    "role" "Role" NOT NULL DEFAULT 'USER',

    CONSTRAINT "User_pkey" PRIMARY KEY ("idUser")
);

-- CreateTable
CREATE TABLE "Blog" (
    "idBlog" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "content" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3),
    "authorEmail" TEXT NOT NULL,

    CONSTRAINT "Blog_pkey" PRIMARY KEY ("idBlog")
);

-- CreateTable
CREATE TABLE "Category" (
    "idCategory" SERIAL NOT NULL,
    "name" TEXT NOT NULL,

    CONSTRAINT "Category_pkey" PRIMARY KEY ("idCategory")
);

-- CreateTable
CREATE TABLE "BlogOnCategory" (
    "blogId" TEXT NOT NULL,
    "categoryId" INTEGER NOT NULL,

    CONSTRAINT "BlogOnCategory_pkey" PRIMARY KEY ("blogId","categoryId")
);

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
CREATE TABLE "NewsCategory" (
    "idCaNews" SERIAL NOT NULL,
    "category" TEXT NOT NULL,

    CONSTRAINT "NewsCategory_pkey" PRIMARY KEY ("idCaNews")
);

-- CreateTable
CREATE TABLE "NewsOnCate" (
    "newsId" INTEGER NOT NULL,
    "idCategory" INTEGER NOT NULL,

    CONSTRAINT "NewsOnCate_pkey" PRIMARY KEY ("newsId","idCategory")
);

-- CreateTable
CREATE TABLE "UserOnNews" (
    "authorEmail" TEXT NOT NULL,
    "newsId" INTEGER NOT NULL,

    CONSTRAINT "UserOnNews_pkey" PRIMARY KEY ("authorEmail","newsId")
);

-- CreateIndex
CREATE UNIQUE INDEX "Profile_userEmail_key" ON "Profile"("userEmail");

-- CreateIndex
CREATE UNIQUE INDEX "User_email_key" ON "User"("email");

-- AddForeignKey
ALTER TABLE "Profile" ADD CONSTRAINT "Profile_userEmail_fkey" FOREIGN KEY ("userEmail") REFERENCES "User"("email") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Blog" ADD CONSTRAINT "Blog_authorEmail_fkey" FOREIGN KEY ("authorEmail") REFERENCES "User"("email") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "BlogOnCategory" ADD CONSTRAINT "BlogOnCategory_blogId_fkey" FOREIGN KEY ("blogId") REFERENCES "Blog"("idBlog") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "BlogOnCategory" ADD CONSTRAINT "BlogOnCategory_categoryId_fkey" FOREIGN KEY ("categoryId") REFERENCES "Category"("idCategory") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "NewsOnCate" ADD CONSTRAINT "NewsOnCate_newsId_fkey" FOREIGN KEY ("newsId") REFERENCES "News"("idNews") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "NewsOnCate" ADD CONSTRAINT "NewsOnCate_idCategory_fkey" FOREIGN KEY ("idCategory") REFERENCES "NewsCategory"("idCaNews") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "UserOnNews" ADD CONSTRAINT "UserOnNews_authorEmail_fkey" FOREIGN KEY ("authorEmail") REFERENCES "User"("email") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "UserOnNews" ADD CONSTRAINT "UserOnNews_newsId_fkey" FOREIGN KEY ("newsId") REFERENCES "News"("idNews") ON DELETE RESTRICT ON UPDATE CASCADE;
