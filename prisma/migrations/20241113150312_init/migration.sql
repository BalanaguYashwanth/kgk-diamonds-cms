-- CreateTable
CREATE TABLE "Post" (
    "id" SERIAL NOT NULL,
    "title" TEXT NOT NULL,
    "Slug" TEXT NOT NULL,
    "Content" TEXT,

    CONSTRAINT "Post_pkey" PRIMARY KEY ("id")
);
