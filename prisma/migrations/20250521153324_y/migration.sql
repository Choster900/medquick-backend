/*
  Warnings:

  - You are about to drop the `users_branches_specialty` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropTable
PRAGMA foreign_keys=off;
DROP TABLE "users_branches_specialty";
PRAGMA foreign_keys=on;

-- CreateTable
CREATE TABLE "branches_specialty" (
    "branches_specialty_id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "branch_id" TEXT NOT NULL,
    "specialty_id" INTEGER NOT NULL,
    "branches_specialty_created_at" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "branches_specialty_update_at" DATETIME NOT NULL,
    "userUser_id" TEXT,
    CONSTRAINT "branches_specialty_branch_id_fkey" FOREIGN KEY ("branch_id") REFERENCES "branch" ("branch_id") ON DELETE CASCADE ON UPDATE CASCADE,
    CONSTRAINT "branches_specialty_specialty_id_fkey" FOREIGN KEY ("specialty_id") REFERENCES "specialty" ("specialty_id") ON DELETE CASCADE ON UPDATE CASCADE,
    CONSTRAINT "branches_specialty_userUser_id_fkey" FOREIGN KEY ("userUser_id") REFERENCES "user" ("user_id") ON DELETE SET NULL ON UPDATE CASCADE
);
