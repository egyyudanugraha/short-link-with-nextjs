-- CreateTable
CREATE TABLE "Link" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "destination" TEXT NOT NULL,
    "short" TEXT NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "Link_short_key" ON "Link"("short");
