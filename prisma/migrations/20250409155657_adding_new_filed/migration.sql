/*
  Warnings:

  - Added the required column `branch_acronym` to the `branch` table without a default value. This is not possible if the table is not empty.
  - Made the column `branch_description` on table `branch` required. This step will fail if there are existing NULL values in that column.

*/
-- RedefineTables
PRAGMA defer_foreign_keys=ON;
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_branch" (
    "branch_id" TEXT NOT NULL PRIMARY KEY,
    "institution_id" TEXT NOT NULL,
    "branch_name" TEXT NOT NULL,
    "branch_acronym" TEXT NOT NULL,
    "branch_description" TEXT NOT NULL,
    "branch_longitude" TEXT,
    "branch_latitude" TEXT,
    "branch_full_address" TEXT,
    "branch_status" BOOLEAN DEFAULT true,
    "branch_created_at" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "branch_updated_at" DATETIME NOT NULL,
    CONSTRAINT "branch_institution_id_fkey" FOREIGN KEY ("institution_id") REFERENCES "institution" ("institution_id") ON DELETE RESTRICT ON UPDATE CASCADE
);
INSERT INTO "new_branch" ("branch_created_at", "branch_description", "branch_id", "branch_latitude", "branch_longitude", "branch_name", "branch_status", "branch_updated_at", "institution_id") SELECT "branch_created_at", "branch_description", "branch_id", "branch_latitude", "branch_longitude", "branch_name", "branch_status", "branch_updated_at", "institution_id" FROM "branch";
DROP TABLE "branch";
ALTER TABLE "new_branch" RENAME TO "branch";
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;
