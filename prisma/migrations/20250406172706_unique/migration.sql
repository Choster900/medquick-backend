/*
  Warnings:

  - You are about to alter the column `user_birthdate` on the `User` table. The data in that column could be lost. The data in that column will be cast from `String` to `DateTime`.

*/
-- RedefineTables
PRAGMA defer_foreign_keys=ON;
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_User" (
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
INSERT INTO "new_User" ("user_address", "user_birthdate", "user_create_at", "user_dui", "user_email", "user_first_lastname", "user_first_name", "user_gender", "user_id", "user_password", "user_phone_number", "user_second_lastname", "user_second_name", "user_third_lastname", "user_third_name", "user_update_at") SELECT "user_address", "user_birthdate", "user_create_at", "user_dui", "user_email", "user_first_lastname", "user_first_name", "user_gender", "user_id", "user_password", "user_phone_number", "user_second_lastname", "user_second_name", "user_third_lastname", "user_third_name", "user_update_at" FROM "User";
DROP TABLE "User";
ALTER TABLE "new_User" RENAME TO "User";
CREATE UNIQUE INDEX "User_user_email_key" ON "User"("user_email");
CREATE UNIQUE INDEX "User_user_dui_key" ON "User"("user_dui");
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;
