-- CreateTable
CREATE TABLE "medical_appointment_state" (
    "medical_appointment_state_id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "medical_appointment_state_description" TEXT NOT NULL,
    "medical_appointment_state_created_at" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "medical_appointment_state_updated_at" DATETIME NOT NULL
);

-- CreateTable
CREATE TABLE "non_registered_patient" (
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
    CONSTRAINT "non_registered_patient_legal_representative_id_fkey" FOREIGN KEY ("legal_representative_id") REFERENCES "user" ("user_id") ON DELETE SET NULL ON UPDATE CASCADE,
    CONSTRAINT "non_registered_patient_relationship_type_id_fkey" FOREIGN KEY ("relationship_type_id") REFERENCES "relationship_type" ("relationship_type_id") ON DELETE SET NULL ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "relationship_type" (
    "relationship_type_id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "relationship_type_description" TEXT NOT NULL,
    "relationship_type_created_at" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "relationship_type_updated_at" DATETIME NOT NULL
);

-- CreateTable
CREATE TABLE "medical_appointment" (
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
    CONSTRAINT "medical_appointment_patient_user_id_fkey" FOREIGN KEY ("patient_user_id") REFERENCES "user" ("user_id") ON DELETE SET NULL ON UPDATE CASCADE,
    CONSTRAINT "medical_appointment_doctor_user_id_fkey" FOREIGN KEY ("doctor_user_id") REFERENCES "user" ("user_id") ON DELETE SET NULL ON UPDATE CASCADE,
    CONSTRAINT "medical_appointment_appointment_scheduler_id_fkey" FOREIGN KEY ("appointment_scheduler_id") REFERENCES "user" ("user_id") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "medical_appointment_branch_id_fkey" FOREIGN KEY ("branch_id") REFERENCES "branch" ("branch_id") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "medical_appointment_specialty_id_fkey" FOREIGN KEY ("specialty_id") REFERENCES "specialty" ("specialty_id") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "medical_appointment_medical_appointment_state_id_fkey" FOREIGN KEY ("medical_appointment_state_id") REFERENCES "medical_appointment_state" ("medical_appointment_state_id") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "medical_exam" (
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
    CONSTRAINT "medical_exam_medical_appointment_id_fkey" FOREIGN KEY ("medical_appointment_id") REFERENCES "medical_appointment" ("medical_appointment_id") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "medical_exam_medical_exam_type_file_id_fkey" FOREIGN KEY ("medical_exam_type_file_id") REFERENCES "file_type" ("file_type_id") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "file_type" (
    "file_type_id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "file_type_name" TEXT NOT NULL,
    "file_type_mime_type" TEXT,
    "file_type_extension" TEXT,
    "file_type_created_at" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "file_type_updated_at" DATETIME NOT NULL
);

-- CreateTable
CREATE TABLE "branch_comment" (
    "branch_comment_id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "user_id" TEXT NOT NULL,
    "branch_id" TEXT NOT NULL,
    "branch_comment_comment" TEXT NOT NULL,
    "branch_comment_rating" REAL NOT NULL DEFAULT 5.0,
    "branch_comment_created_at" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "branch_comment_updated_at" DATETIME NOT NULL,
    CONSTRAINT "branch_comment_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "user" ("user_id") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "branch_comment_branch_id_fkey" FOREIGN KEY ("branch_id") REFERENCES "branch" ("branch_id") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "medical_comment" (
    "medical_comment_id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "user_id" TEXT NOT NULL,
    "id_medico" TEXT NOT NULL,
    "medical_comment_comment" TEXT NOT NULL,
    "medical_comment_rating" REAL NOT NULL DEFAULT 5.0,
    "medical_comment_created_at" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "medical_comment_updated_at" DATETIME NOT NULL,
    CONSTRAINT "medical_comment_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "user" ("user_id") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "medical_comment_id_medico_fkey" FOREIGN KEY ("id_medico") REFERENCES "user" ("user_id") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "chat" (
    "chat_id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "chat_user_id" TEXT NOT NULL,
    "chat_doctor_id" TEXT NOT NULL,
    "chat_created_at" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "chat_updated_at" DATETIME NOT NULL,
    CONSTRAINT "chat_chat_user_id_fkey" FOREIGN KEY ("chat_user_id") REFERENCES "user" ("user_id") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "chat_chat_doctor_id_fkey" FOREIGN KEY ("chat_doctor_id") REFERENCES "user" ("user_id") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "message" (
    "message_id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "message_user_id" TEXT NOT NULL,
    "message_chat_id" INTEGER NOT NULL,
    "message_content" TEXT NOT NULL,
    "message_file_type" TEXT,
    "message_file_path" TEXT,
    "message_status_id" INTEGER NOT NULL,
    "message_created_at" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "message_updated_at" DATETIME NOT NULL,
    CONSTRAINT "message_message_user_id_fkey" FOREIGN KEY ("message_user_id") REFERENCES "user" ("user_id") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "message_message_chat_id_fkey" FOREIGN KEY ("message_chat_id") REFERENCES "chat" ("chat_id") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "message_message_status_id_fkey" FOREIGN KEY ("message_status_id") REFERENCES "message_status" ("message_status_id") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "message_status" (
    "message_status_id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "message_status_description" TEXT NOT NULL,
    "message_status_created_at" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "message_status_updated_at" DATETIME NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "non_registered_patient_non_registered_patient_dui_key" ON "non_registered_patient"("non_registered_patient_dui");

-- CreateIndex
CREATE UNIQUE INDEX "non_registered_patient_non_registered_patient_email_key" ON "non_registered_patient"("non_registered_patient_email");
