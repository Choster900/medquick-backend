-- AlterTable
ALTER TABLE "branch" ADD COLUMN "branch_status" BOOLEAN DEFAULT true;

-- RedefineTables
PRAGMA defer_foreign_keys=ON;
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_institution" (
    "institution_id" TEXT NOT NULL PRIMARY KEY,
    "institution_name" TEXT NOT NULL,
    "institution_acronym" TEXT NOT NULL,
    "institution_description" TEXT,
    "institution_status" BOOLEAN NOT NULL DEFAULT true,
    "institution_created_at" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "institution_updated_at" DATETIME NOT NULL
);
INSERT INTO "new_institution" ("institution_acronym", "institution_created_at", "institution_description", "institution_id", "institution_name", "institution_updated_at") SELECT "institution_acronym", "institution_created_at", "institution_description", "institution_id", "institution_name", "institution_updated_at" FROM "institution";
DROP TABLE "institution";
ALTER TABLE "new_institution" RENAME TO "institution";
CREATE UNIQUE INDEX "institution_institution_name_key" ON "institution"("institution_name");
CREATE UNIQUE INDEX "institution_institution_acronym_key" ON "institution"("institution_acronym");
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;
