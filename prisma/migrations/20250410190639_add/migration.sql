-- CreateTable
CREATE TABLE "auth_user_profile" (
    "auth_user_profile_id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "security_profile_id" INTEGER NOT NULL,
    "user_id" TEXT NOT NULL,
    "auth_user_profile_created_at" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "auth_user_profile_modified_at" DATETIME NOT NULL,
    CONSTRAINT "auth_user_profile_security_profile_id_fkey" FOREIGN KEY ("security_profile_id") REFERENCES "security_profile" ("security_profile_id") ON DELETE CASCADE ON UPDATE CASCADE,
    CONSTRAINT "auth_user_profile_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "user" ("user_id") ON DELETE CASCADE ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "security_profile" (
    "security_profile_id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "security_profile_profile_name" TEXT NOT NULL,
    "security_profile_profile_description" TEXT NOT NULL,
    "security_profile_created_at" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "security_profile_modified_at" DATETIME NOT NULL
);

-- CreateTable
CREATE TABLE "security_permiso_profile" (
    "security_permiso_profile_id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "security_permission_id" INTEGER NOT NULL,
    "security_profile_id" INTEGER NOT NULL,
    "security_permiso_profile_created_at" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT "security_permiso_profile_security_permission_id_fkey" FOREIGN KEY ("security_permission_id") REFERENCES "security_permission" ("security_permission_id") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "security_permiso_profile_security_profile_id_fkey" FOREIGN KEY ("security_profile_id") REFERENCES "security_profile" ("security_profile_id") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "security_permission" (
    "security_permission_id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "security_permission_permission_name" TEXT NOT NULL,
    "security_permission_permission_code" TEXT NOT NULL,
    "security_permission_created_at" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "security_permission_modified_at" DATETIME NOT NULL
);

-- RedefineTables
PRAGMA defer_foreign_keys=ON;
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_prescription" (
    "prescription_id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "medical_appointment_id" INTEGER NOT NULL,
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
