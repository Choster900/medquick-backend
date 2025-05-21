/*
  Warnings:

  - You are about to drop the column `userUser_id` on the `branches_specialty` table. All the data in the column will be lost.

*/
-- RedefineTables
PRAGMA defer_foreign_keys=ON;
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_branches_specialty" (
    "branches_specialty_id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "branch_id" TEXT NOT NULL,
    "specialty_id" INTEGER NOT NULL,
    "branches_specialty_created_at" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "branches_specialty_update_at" DATETIME NOT NULL,
    CONSTRAINT "branches_specialty_branch_id_fkey" FOREIGN KEY ("branch_id") REFERENCES "branch" ("branch_id") ON DELETE CASCADE ON UPDATE CASCADE,
    CONSTRAINT "branches_specialty_specialty_id_fkey" FOREIGN KEY ("specialty_id") REFERENCES "specialty" ("specialty_id") ON DELETE CASCADE ON UPDATE CASCADE
);
INSERT INTO "new_branches_specialty" ("branch_id", "branches_specialty_created_at", "branches_specialty_id", "branches_specialty_update_at", "specialty_id") SELECT "branch_id", "branches_specialty_created_at", "branches_specialty_id", "branches_specialty_update_at", "specialty_id" FROM "branches_specialty";
DROP TABLE "branches_specialty";
ALTER TABLE "new_branches_specialty" RENAME TO "branches_specialty";
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;
