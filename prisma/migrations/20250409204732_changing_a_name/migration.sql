/*
  Warnings:

  - You are about to drop the column `users_id` on the `users_branches_specialty` table. All the data in the column will be lost.
  - Added the required column `user_id` to the `users_branches_specialty` table without a default value. This is not possible if the table is not empty.

*/
-- RedefineTables
PRAGMA defer_foreign_keys=ON;
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_users_branches_specialty" (
    "users_branches_specialty_id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "user_id" TEXT NOT NULL,
    "specialty_id" INTEGER NOT NULL,
    "users_branches_specialty_created_at" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "users_branches_specialty_update_at" DATETIME NOT NULL,
    CONSTRAINT "users_branches_specialty_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "user" ("user_id") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "users_branches_specialty_specialty_id_fkey" FOREIGN KEY ("specialty_id") REFERENCES "specialty" ("specialty_id") ON DELETE RESTRICT ON UPDATE CASCADE
);
INSERT INTO "new_users_branches_specialty" ("specialty_id", "users_branches_specialty_created_at", "users_branches_specialty_id", "users_branches_specialty_update_at") SELECT "specialty_id", "users_branches_specialty_created_at", "users_branches_specialty_id", "users_branches_specialty_update_at" FROM "users_branches_specialty";
DROP TABLE "users_branches_specialty";
ALTER TABLE "new_users_branches_specialty" RENAME TO "users_branches_specialty";
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;
