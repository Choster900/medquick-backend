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
    CONSTRAINT "branch_institution_id_fkey" FOREIGN KEY ("institution_id") REFERENCES "institution" ("institution_id") ON DELETE CASCADE ON UPDATE CASCADE
);
INSERT INTO "new_branch" ("branch_acronym", "branch_created_at", "branch_description", "branch_full_address", "branch_id", "branch_latitude", "branch_longitude", "branch_name", "branch_status", "branch_updated_at", "institution_id") SELECT "branch_acronym", "branch_created_at", "branch_description", "branch_full_address", "branch_id", "branch_latitude", "branch_longitude", "branch_name", "branch_status", "branch_updated_at", "institution_id" FROM "branch";
DROP TABLE "branch";
ALTER TABLE "new_branch" RENAME TO "branch";
CREATE TABLE "new_branch_comment" (
    "branch_comment_id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "user_id" TEXT NOT NULL,
    "branch_id" TEXT NOT NULL,
    "branch_comment_comment" TEXT NOT NULL,
    "branch_comment_rating" REAL NOT NULL DEFAULT 5.0,
    "branch_comment_created_at" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "branch_comment_updated_at" DATETIME NOT NULL,
    CONSTRAINT "branch_comment_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "user" ("user_id") ON DELETE CASCADE ON UPDATE CASCADE,
    CONSTRAINT "branch_comment_branch_id_fkey" FOREIGN KEY ("branch_id") REFERENCES "branch" ("branch_id") ON DELETE CASCADE ON UPDATE CASCADE
);
INSERT INTO "new_branch_comment" ("branch_comment_comment", "branch_comment_created_at", "branch_comment_id", "branch_comment_rating", "branch_comment_updated_at", "branch_id", "user_id") SELECT "branch_comment_comment", "branch_comment_created_at", "branch_comment_id", "branch_comment_rating", "branch_comment_updated_at", "branch_id", "user_id" FROM "branch_comment";
DROP TABLE "branch_comment";
ALTER TABLE "new_branch_comment" RENAME TO "branch_comment";
CREATE TABLE "new_chat" (
    "chat_id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "chat_user_id" TEXT NOT NULL,
    "chat_doctor_id" TEXT NOT NULL,
    "chat_created_at" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "chat_updated_at" DATETIME NOT NULL,
    CONSTRAINT "chat_chat_user_id_fkey" FOREIGN KEY ("chat_user_id") REFERENCES "user" ("user_id") ON DELETE CASCADE ON UPDATE CASCADE,
    CONSTRAINT "chat_chat_doctor_id_fkey" FOREIGN KEY ("chat_doctor_id") REFERENCES "user" ("user_id") ON DELETE CASCADE ON UPDATE CASCADE
);
INSERT INTO "new_chat" ("chat_created_at", "chat_doctor_id", "chat_id", "chat_updated_at", "chat_user_id") SELECT "chat_created_at", "chat_doctor_id", "chat_id", "chat_updated_at", "chat_user_id" FROM "chat";
DROP TABLE "chat";
ALTER TABLE "new_chat" RENAME TO "chat";
CREATE TABLE "new_medical_comment" (
    "medical_comment_id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "user_id" TEXT NOT NULL,
    "id_medico" TEXT NOT NULL,
    "medical_comment_comment" TEXT NOT NULL,
    "medical_comment_rating" REAL NOT NULL DEFAULT 5.0,
    "medical_comment_created_at" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "medical_comment_updated_at" DATETIME NOT NULL,
    CONSTRAINT "medical_comment_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "user" ("user_id") ON DELETE CASCADE ON UPDATE CASCADE,
    CONSTRAINT "medical_comment_id_medico_fkey" FOREIGN KEY ("id_medico") REFERENCES "user" ("user_id") ON DELETE CASCADE ON UPDATE CASCADE
);
INSERT INTO "new_medical_comment" ("id_medico", "medical_comment_comment", "medical_comment_created_at", "medical_comment_id", "medical_comment_rating", "medical_comment_updated_at", "user_id") SELECT "id_medico", "medical_comment_comment", "medical_comment_created_at", "medical_comment_id", "medical_comment_rating", "medical_comment_updated_at", "user_id" FROM "medical_comment";
DROP TABLE "medical_comment";
ALTER TABLE "new_medical_comment" RENAME TO "medical_comment";
CREATE TABLE "new_medical_exam" (
    "medical_exam_id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "medical_appointment_id" INTEGER NOT NULL,
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
CREATE TABLE "new_message" (
    "message_id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "message_user_id" TEXT NOT NULL,
    "message_chat_id" INTEGER NOT NULL,
    "message_content" TEXT NOT NULL,
    "message_file_type" TEXT,
    "message_file_path" TEXT,
    "message_status_id" INTEGER NOT NULL,
    "message_created_at" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "message_updated_at" DATETIME NOT NULL,
    CONSTRAINT "message_message_user_id_fkey" FOREIGN KEY ("message_user_id") REFERENCES "user" ("user_id") ON DELETE CASCADE ON UPDATE CASCADE,
    CONSTRAINT "message_message_chat_id_fkey" FOREIGN KEY ("message_chat_id") REFERENCES "chat" ("chat_id") ON DELETE CASCADE ON UPDATE CASCADE,
    CONSTRAINT "message_message_status_id_fkey" FOREIGN KEY ("message_status_id") REFERENCES "message_status" ("message_status_id") ON DELETE CASCADE ON UPDATE CASCADE
);
INSERT INTO "new_message" ("message_chat_id", "message_content", "message_created_at", "message_file_path", "message_file_type", "message_id", "message_status_id", "message_updated_at", "message_user_id") SELECT "message_chat_id", "message_content", "message_created_at", "message_file_path", "message_file_type", "message_id", "message_status_id", "message_updated_at", "message_user_id" FROM "message";
DROP TABLE "message";
ALTER TABLE "new_message" RENAME TO "message";
CREATE TABLE "new_non_registered_patient" (
    "non_registered_patient_id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "legal_representative_id" TEXT,
    "relationship_type_id" INTEGER,
    "non_registered_patient_gender" TEXT NOT NULL,
    "non_registered_patient_first_name" TEXT NOT NULL,
    "non_registered_patient_second_name" TEXT NOT NULL,
    "non_registered_patient_thrid_name" TEXT NOT NULL,
    "non_registered_patient_first_lastname" TEXT NOT NULL,
    "non_registered_patient_second_lastname" TEXT NOT NULL,
    "non_registered_patient_third_lastname" TEXT NOT NULL,
    "non_registered_patient_birthdate" DATETIME NOT NULL,
    "non_registered_patient_phone_number" TEXT,
    "non_registered_patient_dui" TEXT,
    "non_registered_patient_address" TEXT,
    "non_registered_patient_email" TEXT,
    "non_registered_patient_genero" BOOLEAN NOT NULL,
    "non_registered_patient_created_at" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "non_registered_patient_updated_at" DATETIME NOT NULL,
    CONSTRAINT "non_registered_patient_legal_representative_id_fkey" FOREIGN KEY ("legal_representative_id") REFERENCES "user" ("user_id") ON DELETE CASCADE ON UPDATE CASCADE,
    CONSTRAINT "non_registered_patient_relationship_type_id_fkey" FOREIGN KEY ("relationship_type_id") REFERENCES "relationship_type" ("relationship_type_id") ON DELETE CASCADE ON UPDATE CASCADE
);
INSERT INTO "new_non_registered_patient" ("legal_representative_id", "non_registered_patient_address", "non_registered_patient_birthdate", "non_registered_patient_created_at", "non_registered_patient_dui", "non_registered_patient_email", "non_registered_patient_first_lastname", "non_registered_patient_first_name", "non_registered_patient_gender", "non_registered_patient_genero", "non_registered_patient_id", "non_registered_patient_phone_number", "non_registered_patient_second_lastname", "non_registered_patient_second_name", "non_registered_patient_third_lastname", "non_registered_patient_thrid_name", "non_registered_patient_updated_at", "relationship_type_id") SELECT "legal_representative_id", "non_registered_patient_address", "non_registered_patient_birthdate", "non_registered_patient_created_at", "non_registered_patient_dui", "non_registered_patient_email", "non_registered_patient_first_lastname", "non_registered_patient_first_name", "non_registered_patient_gender", "non_registered_patient_genero", "non_registered_patient_id", "non_registered_patient_phone_number", "non_registered_patient_second_lastname", "non_registered_patient_second_name", "non_registered_patient_third_lastname", "non_registered_patient_thrid_name", "non_registered_patient_updated_at", "relationship_type_id" FROM "non_registered_patient";
DROP TABLE "non_registered_patient";
ALTER TABLE "new_non_registered_patient" RENAME TO "non_registered_patient";
CREATE UNIQUE INDEX "non_registered_patient_non_registered_patient_dui_key" ON "non_registered_patient"("non_registered_patient_dui");
CREATE UNIQUE INDEX "non_registered_patient_non_registered_patient_email_key" ON "non_registered_patient"("non_registered_patient_email");
CREATE TABLE "new_prescription_item" (
    "prescription_item_id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "prescription_id" INTEGER,
    "administration_route_id" INTEGER,
    "prescription_item_medication_name" TEXT NOT NULL,
    "prescription_item_dosage" TEXT,
    "prescription_item_frequency" TEXT,
    "prescription_item_duration" TEXT,
    "prescription_item_unit" TEXT,
    "prescription_item_item_notes" TEXT,
    "prescription_item_created_at" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "prescription_item_updated_at" DATETIME NOT NULL,
    CONSTRAINT "prescription_item_prescription_id_fkey" FOREIGN KEY ("prescription_id") REFERENCES "prescription" ("prescription_id") ON DELETE CASCADE ON UPDATE CASCADE,
    CONSTRAINT "prescription_item_administration_route_id_fkey" FOREIGN KEY ("administration_route_id") REFERENCES "administration_route" ("administration_route_id") ON DELETE CASCADE ON UPDATE CASCADE
);
INSERT INTO "new_prescription_item" ("administration_route_id", "prescription_id", "prescription_item_created_at", "prescription_item_dosage", "prescription_item_duration", "prescription_item_frequency", "prescription_item_id", "prescription_item_item_notes", "prescription_item_medication_name", "prescription_item_unit", "prescription_item_updated_at") SELECT "administration_route_id", "prescription_id", "prescription_item_created_at", "prescription_item_dosage", "prescription_item_duration", "prescription_item_frequency", "prescription_item_id", "prescription_item_item_notes", "prescription_item_medication_name", "prescription_item_unit", "prescription_item_updated_at" FROM "prescription_item";
DROP TABLE "prescription_item";
ALTER TABLE "new_prescription_item" RENAME TO "prescription_item";
CREATE TABLE "new_users_branches_specialty" (
    "users_branches_specialty_id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "user_id" TEXT NOT NULL,
    "specialty_id" INTEGER NOT NULL,
    "users_branches_specialty_created_at" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "users_branches_specialty_update_at" DATETIME NOT NULL,
    CONSTRAINT "users_branches_specialty_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "user" ("user_id") ON DELETE CASCADE ON UPDATE CASCADE,
    CONSTRAINT "users_branches_specialty_specialty_id_fkey" FOREIGN KEY ("specialty_id") REFERENCES "specialty" ("specialty_id") ON DELETE CASCADE ON UPDATE CASCADE
);
INSERT INTO "new_users_branches_specialty" ("specialty_id", "user_id", "users_branches_specialty_created_at", "users_branches_specialty_id", "users_branches_specialty_update_at") SELECT "specialty_id", "user_id", "users_branches_specialty_created_at", "users_branches_specialty_id", "users_branches_specialty_update_at" FROM "users_branches_specialty";
DROP TABLE "users_branches_specialty";
ALTER TABLE "new_users_branches_specialty" RENAME TO "users_branches_specialty";
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;
