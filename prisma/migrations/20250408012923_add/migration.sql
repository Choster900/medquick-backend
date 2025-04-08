-- CreateTable
CREATE TABLE "user_state" (
    "user_state_id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "user_state_name" TEXT NOT NULL,
    "user_state_description" TEXT NOT NULL,
    "user_state_created_at" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "user_state_updated_at" DATETIME NOT NULL
);

-- CreateTable
CREATE TABLE "user" (
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
    CONSTRAINT "user_user_state_id_fkey" FOREIGN KEY ("user_state_id") REFERENCES "user_state" ("user_state_id") ON DELETE SET NULL ON UPDATE CASCADE
);

-- CreateIndex
CREATE UNIQUE INDEX "user_user_email_key" ON "user"("user_email");

-- CreateIndex
CREATE UNIQUE INDEX "user_user_dui_key" ON "user"("user_dui");
