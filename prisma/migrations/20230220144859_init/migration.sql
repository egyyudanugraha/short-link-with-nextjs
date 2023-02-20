-- CreateTable
CREATE TABLE "Link" (
    "id" TEXT NOT NULL,
    "destination" TEXT NOT NULL,
    "short" TEXT NOT NULL,

    CONSTRAINT "Link_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Link_short_key" ON "Link"("short");
