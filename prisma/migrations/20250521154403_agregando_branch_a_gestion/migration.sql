/*
  Warnings:

  - Added the required column `branch_id` to the `medical_procedures` table without a default value. This is not possible if the table is not empty.

*/
-- RedefineTables
PRAGMA defer_foreign_keys=ON;
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_medical_procedures" (
    "medical_procedure_id" TEXT NOT NULL PRIMARY KEY,
    "specialty_id" INTEGER NOT NULL,
    "branch_id" TEXT NOT NULL,
    "medical_procedure_name" TEXT NOT NULL,
    "medical_procedure_photo_url" TEXT NOT NULL,
    "medical_procedure_estimated_duration" TEXT NOT NULL,
    "medical_procedure_requires_confirmation" BOOLEAN NOT NULL,
    "medical_procedure_cost" DECIMAL,
    "medical_procedure_available_online" BOOLEAN NOT NULL,
    "medical_procedure_available_slots" INTEGER,
    "medical_procedure_is_active" BOOLEAN NOT NULL,
    "medical_procedure_created_at" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "medical_procedure_update_at" DATETIME NOT NULL,
    CONSTRAINT "medical_procedures_specialty_id_fkey" FOREIGN KEY ("specialty_id") REFERENCES "specialty" ("specialty_id") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "medical_procedures_branch_id_fkey" FOREIGN KEY ("branch_id") REFERENCES "branch" ("branch_id") ON DELETE RESTRICT ON UPDATE CASCADE
);
INSERT INTO "new_medical_procedures" ("medical_procedure_available_online", "medical_procedure_available_slots", "medical_procedure_cost", "medical_procedure_created_at", "medical_procedure_estimated_duration", "medical_procedure_id", "medical_procedure_is_active", "medical_procedure_name", "medical_procedure_photo_url", "medical_procedure_requires_confirmation", "medical_procedure_update_at", "specialty_id") SELECT "medical_procedure_available_online", "medical_procedure_available_slots", "medical_procedure_cost", "medical_procedure_created_at", "medical_procedure_estimated_duration", "medical_procedure_id", "medical_procedure_is_active", "medical_procedure_name", "medical_procedure_photo_url", "medical_procedure_requires_confirmation", "medical_procedure_update_at", "specialty_id" FROM "medical_procedures";
DROP TABLE "medical_procedures";
ALTER TABLE "new_medical_procedures" RENAME TO "medical_procedures";
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;
