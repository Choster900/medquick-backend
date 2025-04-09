/*
  Warnings:

  - Added the required column `specialt_status` to the `specialty` table without a default value. This is not possible if the table is not empty.

*/
-- RedefineTables
PRAGMA defer_foreign_keys=ON;
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_specialty" (
    "specialty_id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "specialty_name" TEXT NOT NULL,
    "specialt_description" TEXT,
    "specialt_status" BOOLEAN NOT NULL,
    "specialty_created_at" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "specialty_update_at" DATETIME NOT NULL
);
INSERT INTO "new_specialty" ("specialt_description", "specialty_created_at", "specialty_id", "specialty_name", "specialty_update_at") SELECT "specialt_description", "specialty_created_at", "specialty_id", "specialty_name", "specialty_update_at" FROM "specialty";
DROP TABLE "specialty";
ALTER TABLE "new_specialty" RENAME TO "specialty";
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;
