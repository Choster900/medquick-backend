/*
  Warnings:

  - You are about to drop the column `specialty_id` on the `medical_appointment` table. All the data in the column will be lost.
  - Added the required column `medical_procedure_id` to the `medical_appointment` table without a default value. This is not possible if the table is not empty.

*/
-- CreateTable
CREATE TABLE "medical_procedures" (
    "medical_procedure_id" TEXT NOT NULL PRIMARY KEY,
    "specialty_id" INTEGER NOT NULL,
    "medical_procedure_name" TEXT NOT NULL,
    "medical_procedure_photo_url" TEXT NOT NULL,
    "medical_procedure_estimated_duration" TEXT NOT NULL,
    "medical_procedure_required_exams_count" INTEGER NOT NULL,
    "medical_procedure_requires_confirmation" BOOLEAN NOT NULL,
    "medical_procedure_cost" DECIMAL NOT NULL,
    "medical_procedure_available_online" BOOLEAN NOT NULL,
    "medical_procedure_available_slots" INTEGER NOT NULL,
    "medical_procedure_is_active" BOOLEAN NOT NULL,
    "medical_procedure_specialty_id" INTEGER NOT NULL,
    "medical_procedure_created_at" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "medical_procedure_update_at" DATETIME NOT NULL,
    CONSTRAINT "medical_procedures_specialty_id_fkey" FOREIGN KEY ("specialty_id") REFERENCES "specialty" ("specialty_id") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "procedure_required_exams" (
    "procedure_required_exam_id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "procedure_id" TEXT NOT NULL,
    "exam_id" INTEGER NOT NULL,
    "procedure_required_exam_created_at" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "procedure_required_exam_update_at" DATETIME NOT NULL,
    CONSTRAINT "procedure_required_exams_procedure_id_fkey" FOREIGN KEY ("procedure_id") REFERENCES "medical_procedures" ("medical_procedure_id") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "procedure_required_exams_exam_id_fkey" FOREIGN KEY ("exam_id") REFERENCES "exams" ("exam_id") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "exams" (
    "exam_id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "exam_name" TEXT NOT NULL,
    "exam_created_at" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "exam_update_at" DATETIME NOT NULL
);

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
    "medical_procedure_id" TEXT NOT NULL,
    "medical_appointment_state_id" INTEGER NOT NULL,
    "medical_appointment_date_time" DATETIME,
    "medical_appointment_cancellation_reason" TEXT,
    "medical_appointment_notes" TEXT,
    "medical_appointment_created_at" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "medical_appointment_updated_at" DATETIME NOT NULL,
    "specialtySpecialty_id" INTEGER,
    CONSTRAINT "medical_appointment_non_registered_patient_id_fkey" FOREIGN KEY ("non_registered_patient_id") REFERENCES "non_registered_patient" ("non_registered_patient_id") ON DELETE SET NULL ON UPDATE CASCADE,
    CONSTRAINT "medical_appointment_patient_user_id_fkey" FOREIGN KEY ("patient_user_id") REFERENCES "user" ("user_id") ON DELETE CASCADE ON UPDATE CASCADE,
    CONSTRAINT "medical_appointment_doctor_user_id_fkey" FOREIGN KEY ("doctor_user_id") REFERENCES "user" ("user_id") ON DELETE CASCADE ON UPDATE CASCADE,
    CONSTRAINT "medical_appointment_appointment_scheduler_id_fkey" FOREIGN KEY ("appointment_scheduler_id") REFERENCES "user" ("user_id") ON DELETE SET NULL ON UPDATE CASCADE,
    CONSTRAINT "medical_appointment_branch_id_fkey" FOREIGN KEY ("branch_id") REFERENCES "branch" ("branch_id") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "medical_appointment_medical_procedure_id_fkey" FOREIGN KEY ("medical_procedure_id") REFERENCES "medical_procedures" ("medical_procedure_id") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "medical_appointment_medical_appointment_state_id_fkey" FOREIGN KEY ("medical_appointment_state_id") REFERENCES "medical_appointment_state" ("medical_appointment_state_id") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "medical_appointment_specialtySpecialty_id_fkey" FOREIGN KEY ("specialtySpecialty_id") REFERENCES "specialty" ("specialty_id") ON DELETE SET NULL ON UPDATE CASCADE
);
INSERT INTO "new_medical_appointment" ("appointment_scheduler_id", "branch_id", "doctor_user_id", "medical_appointment_cancellation_reason", "medical_appointment_created_at", "medical_appointment_date_time", "medical_appointment_id", "medical_appointment_notes", "medical_appointment_state_id", "medical_appointment_updated_at", "non_registered_patient_id", "patient_user_id") SELECT "appointment_scheduler_id", "branch_id", "doctor_user_id", "medical_appointment_cancellation_reason", "medical_appointment_created_at", "medical_appointment_date_time", "medical_appointment_id", "medical_appointment_notes", "medical_appointment_state_id", "medical_appointment_updated_at", "non_registered_patient_id", "patient_user_id" FROM "medical_appointment";
DROP TABLE "medical_appointment";
ALTER TABLE "new_medical_appointment" RENAME TO "medical_appointment";
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;
