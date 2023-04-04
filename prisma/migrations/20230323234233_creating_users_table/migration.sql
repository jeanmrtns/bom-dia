-- CreateTable
CREATE TABLE "users" (
    "id" SERIAL NOT NULL,
    "phone" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "pictureTheme" TEXT NOT NULL,
    "phraseTheme" TEXT NOT NULL,

    CONSTRAINT "users_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "users_phone_key" ON "users"("phone");
