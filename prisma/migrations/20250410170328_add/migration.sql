-- RedefineTables
PRAGMA defer_foreign_keys=ON;
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_medical_appointment" (
    "medical_appointment_id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "non_registered_patient_id" INTEGER,
    "patient_user_id" TEXT,
    "doctor_user_id" TEXT,
    "appointment_scheduler_id" TEXT NOT NULL,
    "branch_id" TEXT NOT NULL,
    "specialty_id" INTEGER NOT NULL,
    "medical_appointment_state_id" INTEGER NOT NULL,
    "medical_appointment_date_time" DATETIME NOT NULL,
    "medical_appointment_cancellation_reason" TEXT,
    "medical_appointment_notes" TEXT,
    "medical_appointment_created_at" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "medical_appointment_updated_at" DATETIME NOT NULL,
    CONSTRAINT "medical_appointment_non_registered_patient_id_fkey" FOREIGN KEY ("non_registered_patient_id") REFERENCES "non_registered_patient" ("non_registered_patient_id") ON DELETE SET NULL ON UPDATE CASCADE,
    CONSTRAINT "medical_appointment_patient_user_id_fkey" FOREIGN KEY ("patient_user_id") REFERENCES "user" ("user_id") ON DELETE CASCADE ON UPDATE CASCADE,
    CONSTRAINT "medical_appointment_doctor_user_id_fkey" FOREIGN KEY ("doctor_user_id") REFERENCES "user" ("user_id") ON DELETE CASCADE ON UPDATE CASCADE,
    CONSTRAINT "medical_appointment_appointment_scheduler_id_fkey" FOREIGN KEY ("appointment_scheduler_id") REFERENCES "user" ("user_id") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "medical_appointment_branch_id_fkey" FOREIGN KEY ("branch_id") REFERENCES "branch" ("branch_id") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "medical_appointment_specialty_id_fkey" FOREIGN KEY ("specialty_id") REFERENCES "specialty" ("specialty_id") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "medical_appointment_medical_appointment_state_id_fkey" FOREIGN KEY ("medical_appointment_state_id") REFERENCES "medical_appointment_state" ("medical_appointment_state_id") ON DELETE RESTRICT ON UPDATE CASCADE
);
INSERT INTO "new_medical_appointment" ("appointment_scheduler_id", "branch_id", "doctor_user_id", "medical_appointment_cancellation_reason", "medical_appointment_created_at", "medical_appointment_date_time", "medical_appointment_id", "medical_appointment_notes", "medical_appointment_state_id", "medical_appointment_updated_at", "non_registered_patient_id", "patient_user_id", "specialty_id") SELECT "appointment_scheduler_id", "branch_id", "doctor_user_id", "medical_appointment_cancellation_reason", "medical_appointment_created_at", "medical_appointment_date_time", "medical_appointment_id", "medical_appointment_notes", "medical_appointment_state_id", "medical_appointment_updated_at", "non_registered_patient_id", "patient_user_id", "specialty_id" FROM "medical_appointment";
DROP TABLE "medical_appointment";
ALTER TABLE "new_medical_appointment" RENAME TO "medical_appointment";
CREATE TABLE "new_user" (
    "user_id" TEXT NOT NULL PRIMARY KEY,
    "user_state_id" INTEGER,
    "user_gender" TEXT NOT NULL,
    "user_first_name" TEXT NOT NULL,
    "user_second_name" TEXT NOT NULL,
    "user_third_name" TEXT NOT NULL,
    "user_first_lastname" TEXT NOT NULL,
    "user_second_lastname" TEXT NOT NULL,
    "user_third_lastname" TEXT NOT NULL,
    "user_email" TEXT NOT NULL,
    "user_password" TEXT NOT NULL,
    "user_dui" TEXT NOT NULL,
    "user_birthdate" DATETIME NOT NULL,
    "user_phone_number" TEXT NOT NULL,
    "user_address" TEXT NOT NULL,
    "user_create_at" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "user_update_at" DATETIME NOT NULL,
    CONSTRAINT "user_user_state_id_fkey" FOREIGN KEY ("user_state_id") REFERENCES "user_state" ("user_state_id") ON DELETE CASCADE ON UPDATE CASCADE
);
INSERT INTO "new_user" ("user_address", "user_birthdate", "user_create_at", "user_dui", "user_email", "user_first_lastname", "user_first_name", "user_gender", "user_id", "user_password", "user_phone_number", "user_second_lastname", "user_second_name", "user_state_id", "user_third_lastname", "user_third_name", "user_update_at") SELECT "user_address", "user_birthdate", "user_create_at", "user_dui", "user_email", "user_first_lastname", "user_first_name", "user_gender", "user_id", "user_password", "user_phone_number", "user_second_lastname", "user_second_name", "user_state_id", "user_third_lastname", "user_third_name", "user_update_at" FROM "user";
DROP TABLE "user";
ALTER TABLE "new_user" RENAME TO "user";
CREATE UNIQUE INDEX "user_user_email_key" ON "user"("user_email");
CREATE UNIQUE INDEX "user_user_dui_key" ON "user"("user_dui");
CREATE TABLE "new_users_branches_specialty" (
    "users_branches_specialty_id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "user_id" TEXT NOT NULL,
    "specialty_id" INTEGER NOT NULL,
    "users_branches_specialty_created_at" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "users_branches_specialty_update_at" DATETIME NOT NULL,
    CONSTRAINT "users_branches_specialty_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "user" ("user_id") ON DELETE CASCADE ON UPDATE CASCADE,
    CONSTRAINT "users_branches_specialty_specialty_id_fkey" FOREIGN KEY ("specialty_id") REFERENCES "specialty" ("specialty_id") ON DELETE RESTRICT ON UPDATE CASCADE
);
INSERT INTO "new_users_branches_specialty" ("specialty_id", "user_id", "users_branches_specialty_created_at", "users_branches_specialty_id", "users_branches_specialty_update_at") SELECT "specialty_id", "user_id", "users_branches_specialty_created_at", "users_branches_specialty_id", "users_branches_specialty_update_at" FROM "users_branches_specialty";
DROP TABLE "users_branches_specialty";
ALTER TABLE "new_users_branches_specialty" RENAME TO "users_branches_specialty";
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;
