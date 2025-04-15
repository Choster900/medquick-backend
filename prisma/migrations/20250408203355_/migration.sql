/*
  Warnings:

  - The primary key for the `branch` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - The primary key for the `institution` table will be changed. If it partially fails, the table could be left without primary key constraint.

*/
-- RedefineTables
PRAGMA defer_foreign_keys=ON;
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_branch" (
    "branch_id" TEXT NOT NULL PRIMARY KEY,
    "institution_id" TEXT NOT NULL,
    "branch_name" TEXT NOT NULL,
    "branch_longitude" TEXT,
    "branch_latitude" TEXT,
    "branch_description" TEXT,
    "branch_created_at" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "branch_updated_at" DATETIME NOT NULL,
    CONSTRAINT "branch_institution_id_fkey" FOREIGN KEY ("institution_id") REFERENCES "institution" ("institution_id") ON DELETE RESTRICT ON UPDATE CASCADE
);
INSERT INTO "new_branch" ("branch_created_at", "branch_description", "branch_id", "branch_latitude", "branch_longitude", "branch_name", "branch_updated_at", "institution_id") SELECT "branch_created_at", "branch_description", "branch_id", "branch_latitude", "branch_longitude", "branch_name", "branch_updated_at", "institution_id" FROM "branch";
DROP TABLE "branch";
ALTER TABLE "new_branch" RENAME TO "branch";
CREATE TABLE "new_institution" (
    "institution_id" TEXT NOT NULL PRIMARY KEY,
    "institution_name" TEXT NOT NULL,
    "institution_description" TEXT,
    "institution_created_at" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "institution_updated_at" DATETIME NOT NULL
);
INSERT INTO "new_institution" ("institution_created_at", "institution_description", "institution_id", "institution_name", "institution_updated_at") SELECT "institution_created_at", "institution_description", "institution_id", "institution_name", "institution_updated_at" FROM "institution";
DROP TABLE "institution";
ALTER TABLE "new_institution" RENAME TO "institution";
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;
