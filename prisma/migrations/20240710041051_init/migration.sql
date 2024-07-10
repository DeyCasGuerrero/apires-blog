-- CreateTable
CREATE TABLE "NewsCategory" (
    "idCaNews" SERIAL NOT NULL,
    "category" TEXT NOT NULL,

    CONSTRAINT "NewsCategory_pkey" PRIMARY KEY ("idCaNews")
);

-- CreateTable
CREATE TABLE "newsOnCate" (
    "newsId" INTEGER NOT NULL,
    "idCategory" INTEGER NOT NULL,

    CONSTRAINT "newsOnCate_pkey" PRIMARY KEY ("newsId","idCategory")
);

-- AddForeignKey
ALTER TABLE "newsOnCate" ADD CONSTRAINT "newsOnCate_newsId_fkey" FOREIGN KEY ("newsId") REFERENCES "News"("idNews") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "newsOnCate" ADD CONSTRAINT "newsOnCate_idCategory_fkey" FOREIGN KEY ("idCategory") REFERENCES "NewsCategory"("idCaNews") ON DELETE RESTRICT ON UPDATE CASCADE;
