/*
  Warnings:

  - You are about to drop the `User` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropTable
PRAGMA foreign_keys=off;
DROP TABLE "User";
PRAGMA foreign_keys=on;

-- CreateTable
CREATE TABLE "user" (
    "user_id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "user_gender" TEXT NOT NULL,
    "user_first_name" TEXT NOT NULL,
    "user_second_name" TEXT NOT NULL,
    "user_third_name" TEXT NOT NULL,
    "user_first_lastname" TEXT NOT NULL,
    "user_second_lastname" TEXT NOT NULL,
    "user_third_lastname" TEXT NOT NULL,
    "user_email" TEXT NOT NULL,
    "user_password" TEXT NOT NULL,
    "user_dui" TEXT NOT NULL,
    "user_birthdate" DATETIME NOT NULL,
    "user_phone_number" TEXT NOT NULL,
    "user_address" TEXT NOT NULL,
    "user_create_at" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "user_update_at" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP
);

-- CreateIndex
CREATE UNIQUE INDEX "user_user_email_key" ON "user"("user_email");

-- CreateIndex
CREATE UNIQUE INDEX "user_user_dui_key" ON "user"("user_dui");
