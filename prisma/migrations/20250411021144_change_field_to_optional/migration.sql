-- RedefineTables
PRAGMA defer_foreign_keys=ON;
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_medical_appointment" (
    "medical_appointment_id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
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
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;
