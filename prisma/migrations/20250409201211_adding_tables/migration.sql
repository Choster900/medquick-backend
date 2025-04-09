-- CreateTable
CREATE TABLE "administration_route" (
    "administration_route_id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "administration_route_name" TEXT NOT NULL,
    "administration_route_description" TEXT,
    "administration_route_status" BOOLEAN NOT NULL,
    "administration_route_created_at" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "administration_route_updated_at" DATETIME NOT NULL
);

-- CreateTable
CREATE TABLE "prescription" (
    "prescription_id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "medical_appointment_id" INTEGER NOT NULL,
    "prescription_notes" TEXT,
    "prescription_fecha_emision" DATETIME NOT NULL,
    "prescription_created_at" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "prescription_updated_at" DATETIME NOT NULL
);

-- CreateTable
CREATE TABLE "prescription_item" (
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
    CONSTRAINT "prescription_item_prescription_id_fkey" FOREIGN KEY ("prescription_id") REFERENCES "prescription" ("prescription_id") ON DELETE SET NULL ON UPDATE CASCADE,
    CONSTRAINT "prescription_item_administration_route_id_fkey" FOREIGN KEY ("administration_route_id") REFERENCES "administration_route" ("administration_route_id") ON DELETE SET NULL ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "specialty" (
    "specialty_id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "specialty_name" TEXT NOT NULL,
    "specialt_description" TEXT,
    "specialty_created_at" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "specialty_update_at" DATETIME NOT NULL
);

-- CreateTable
CREATE TABLE "users_branches_specialty" (
    "users_branches_specialty_id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "users_id" TEXT NOT NULL,
    "specialty_id" INTEGER NOT NULL,
    "users_branches_specialty_created_at" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "users_branches_specialty_update_at" DATETIME NOT NULL,
    CONSTRAINT "users_branches_specialty_users_id_fkey" FOREIGN KEY ("users_id") REFERENCES "user" ("user_id") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "users_branches_specialty_specialty_id_fkey" FOREIGN KEY ("specialty_id") REFERENCES "specialty" ("specialty_id") ON DELETE RESTRICT ON UPDATE CASCADE
);
