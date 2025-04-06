/*
  Warnings:

  - The primary key for the `User` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `userAddress` on the `User` table. All the data in the column will be lost.
  - You are about to drop the column `userBirthdate` on the `User` table. All the data in the column will be lost.
  - You are about to drop the column `userCreateAt` on the `User` table. All the data in the column will be lost.
  - You are about to drop the column `userDui` on the `User` table. All the data in the column will be lost.
  - You are about to drop the column `userEmail` on the `User` table. All the data in the column will be lost.
  - You are about to drop the column `userFirstLastname` on the `User` table. All the data in the column will be lost.
  - You are about to drop the column `userFirstName` on the `User` table. All the data in the column will be lost.
  - You are about to drop the column `userGender` on the `User` table. All the data in the column will be lost.
  - You are about to drop the column `userId` on the `User` table. All the data in the column will be lost.
  - You are about to drop the column `userPassword` on the `User` table. All the data in the column will be lost.
  - You are about to drop the column `userPhoneNumber` on the `User` table. All the data in the column will be lost.
  - You are about to drop the column `userSecondLastname` on the `User` table. All the data in the column will be lost.
  - You are about to drop the column `userSecondName` on the `User` table. All the data in the column will be lost.
  - You are about to drop the column `userThirdLastname` on the `User` table. All the data in the column will be lost.
  - You are about to drop the column `userThirdName` on the `User` table. All the data in the column will be lost.
  - You are about to drop the column `userUpdateAt` on the `User` table. All the data in the column will be lost.
  - Added the required column `user_address` to the `User` table without a default value. This is not possible if the table is not empty.
  - Added the required column `user_birthdate` to the `User` table without a default value. This is not possible if the table is not empty.
  - Added the required column `user_dui` to the `User` table without a default value. This is not possible if the table is not empty.
  - Added the required column `user_email` to the `User` table without a default value. This is not possible if the table is not empty.
  - Added the required column `user_first_lastname` to the `User` table without a default value. This is not possible if the table is not empty.
  - Added the required column `user_first_name` to the `User` table without a default value. This is not possible if the table is not empty.
  - Added the required column `user_gender` to the `User` table without a default value. This is not possible if the table is not empty.
  - Added the required column `user_id` to the `User` table without a default value. This is not possible if the table is not empty.
  - Added the required column `user_password` to the `User` table without a default value. This is not possible if the table is not empty.
  - Added the required column `user_phone_number` to the `User` table without a default value. This is not possible if the table is not empty.
  - Added the required column `user_second_lastname` to the `User` table without a default value. This is not possible if the table is not empty.
  - Added the required column `user_second_name` to the `User` table without a default value. This is not possible if the table is not empty.
  - Added the required column `user_third_lastname` to the `User` table without a default value. This is not possible if the table is not empty.
  - Added the required column `user_third_name` to the `User` table without a default value. This is not possible if the table is not empty.

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
    "user_birthdate" TEXT NOT NULL,
    "user_phone_number" TEXT NOT NULL,
    "user_address" TEXT NOT NULL,
    "user_create_at" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "user_update_at" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP
);
DROP TABLE "User";
ALTER TABLE "new_User" RENAME TO "User";
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;
