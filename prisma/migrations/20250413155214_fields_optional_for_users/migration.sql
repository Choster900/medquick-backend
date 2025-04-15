-- RedefineTables
PRAGMA defer_foreign_keys=ON;
PRAGMA foreign_keys=OFF;
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
    "user_email" TEXT,
    "user_password" TEXT NOT NULL,
    "user_dui" TEXT,
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
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;
