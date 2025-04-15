/*
  Warnings:

  - The primary key for the `medical_appointment` table will be changed. If it partially fails, the table could be left without primary key constraint.

*/
-- RedefineTables
PRAGMA defer_foreign_keys=ON;
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_medical_appointment" (
    "medical_appointment_id" TEXT NOT NULL PRIMARY KEY,
    "non_registered_patient_id" INTEGER,
    "patient_user_id" TEXT,
    "doctor_user_id" TEXT,
    "appointment_scheduler_id" TEXT,
    "branch_id" TEXT NOT NULL,
    "specialty_id" INTEGER NOT NULL,
    "medical_appointment_state_id" INTEGER NOT NULL,
    "medical_appointment_date_time" DATETIME,
    "medical_appointment_cancellation_reason" TEXT,
    "medical_appointment_notes" TEXT,
    "medical_appointment_created_at" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "medical_appointment_updated_at" DATETIME NOT NULL,
    CONSTRAINT "medical_appointment_non_registered_patient_id_fkey" FOREIGN KEY ("non_registered_patient_id") REFERENCES "non_registered_patient" ("non_registered_patient_id") ON DELETE SET NULL ON UPDATE CASCADE,
    CONSTRAINT "medical_appointment_patient_user_id_fkey" FOREIGN KEY ("patient_user_id") REFERENCES "user" ("user_id") ON DELETE CASCADE ON UPDATE CASCADE,
    CONSTRAINT "medical_appointment_doctor_user_id_fkey" FOREIGN KEY ("doctor_user_id") REFERENCES "user" ("user_id") ON DELETE CASCADE ON UPDATE CASCADE,
    CONSTRAINT "medical_appointment_appointment_scheduler_id_fkey" FOREIGN KEY ("appointment_scheduler_id") REFERENCES "user" ("user_id") ON DELETE SET NULL ON UPDATE CASCADE,
    CONSTRAINT "medical_appointment_branch_id_fkey" FOREIGN KEY ("branch_id") REFERENCES "branch" ("branch_id") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "medical_appointment_specialty_id_fkey" FOREIGN KEY ("specialty_id") REFERENCES "specialty" ("specialty_id") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "medical_appointment_medical_appointment_state_id_fkey" FOREIGN KEY ("medical_appointment_state_id") REFERENCES "medical_appointment_state" ("medical_appointment_state_id") ON DELETE RESTRICT ON UPDATE CASCADE
);
INSERT INTO "new_medical_appointment" ("appointment_scheduler_id", "branch_id", "doctor_user_id", "medical_appointment_cancellation_reason", "medical_appointment_created_at", "medical_appointment_date_time", "medical_appointment_id", "medical_appointment_notes", "medical_appointment_state_id", "medical_appointment_updated_at", "non_registered_patient_id", "patient_user_id", "specialty_id") SELECT "appointment_scheduler_id", "branch_id", "doctor_user_id", "medical_appointment_cancellation_reason", "medical_appointment_created_at", "medical_appointment_date_time", "medical_appointment_id", "medical_appointment_notes", "medical_appointment_state_id", "medical_appointment_updated_at", "non_registered_patient_id", "patient_user_id", "specialty_id" FROM "medical_appointment";
DROP TABLE "medical_appointment";
ALTER TABLE "new_medical_appointment" RENAME TO "medical_appointment";
CREATE TABLE "new_medical_exam" (
    "medical_exam_id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "medical_appointment_id" TEXT NOT NULL,
    "medical_exam_type_file_id" INTEGER NOT NULL,
    "medical_exam_name_file" TEXT NOT NULL,
    "medical_exam_path" TEXT,
    "medical_exam_description" TEXT,
    "medical_exam_origin_examp" BOOLEAN NOT NULL,
    "medical_exam_date_up" DATETIME,
    "medical_exam_created_at" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "medical_exam_updated_at" DATETIME NOT NULL,
    CONSTRAINT "medical_exam_medical_appointment_id_fkey" FOREIGN KEY ("medical_appointment_id") REFERENCES "medical_appointment" ("medical_appointment_id") ON DELETE CASCADE ON UPDATE CASCADE,
    CONSTRAINT "medical_exam_medical_exam_type_file_id_fkey" FOREIGN KEY ("medical_exam_type_file_id") REFERENCES "file_type" ("file_type_id") ON DELETE CASCADE ON UPDATE CASCADE
);
INSERT INTO "new_medical_exam" ("medical_appointment_id", "medical_exam_created_at", "medical_exam_date_up", "medical_exam_description", "medical_exam_id", "medical_exam_name_file", "medical_exam_origin_examp", "medical_exam_path", "medical_exam_type_file_id", "medical_exam_updated_at") SELECT "medical_appointment_id", "medical_exam_created_at", "medical_exam_date_up", "medical_exam_description", "medical_exam_id", "medical_exam_name_file", "medical_exam_origin_examp", "medical_exam_path", "medical_exam_type_file_id", "medical_exam_updated_at" FROM "medical_exam";
DROP TABLE "medical_exam";
ALTER TABLE "new_medical_exam" RENAME TO "medical_exam";
CREATE TABLE "new_prescription" (
    "prescription_id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "medical_appointment_id" TEXT NOT NULL,
    "prescription_notes" TEXT,
    "prescription_fecha_emision" DATETIME NOT NULL,
    "prescription_created_at" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "prescription_updated_at" DATETIME NOT NULL,
    CONSTRAINT "prescription_medical_appointment_id_fkey" FOREIGN KEY ("medical_appointment_id") REFERENCES "medical_appointment" ("medical_appointment_id") ON DELETE CASCADE ON UPDATE CASCADE
);
INSERT INTO "new_prescription" ("medical_appointment_id", "prescription_created_at", "prescription_fecha_emision", "prescription_id", "prescription_notes", "prescription_updated_at") SELECT "medical_appointment_id", "prescription_created_at", "prescription_fecha_emision", "prescription_id", "prescription_notes", "prescription_updated_at" FROM "prescription";
DROP TABLE "prescription";
ALTER TABLE "new_prescription" RENAME TO "prescription";
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;
