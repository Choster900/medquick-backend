-- CreateTable
CREATE TABLE "institution" (
    "institution_id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "institution_name" TEXT NOT NULL,
    "institution_description" TEXT,
    "institution_created_at" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "institution_updated_at" DATETIME NOT NULL
);

-- CreateTable
CREATE TABLE "branch" (
    "branch_id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "institution_id" INTEGER NOT NULL,
    "branch_name" TEXT NOT NULL,
    "branch_longitude" TEXT,
    "branch_latitude" TEXT,
    "branch_description" TEXT,
    "branch_created_at" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "branch_updated_at" DATETIME NOT NULL,
    CONSTRAINT "branch_institution_id_fkey" FOREIGN KEY ("institution_id") REFERENCES "institution" ("institution_id") ON DELETE RESTRICT ON UPDATE CASCADE
);
