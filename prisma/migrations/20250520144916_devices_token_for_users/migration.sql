-- CreateTable
CREATE TABLE "user_devices" (
    "user_devices_id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "user_id" TEXT NOT NULL,
    "user_devices_token" TEXT NOT NULL,
    "user_devices_type" TEXT,
    "user_devices_is_active" BOOLEAN NOT NULL,
    "user_devices_created_at" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "user_devices_updated_at" DATETIME NOT NULL,
    CONSTRAINT "user_devices_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "user" ("user_id") ON DELETE CASCADE ON UPDATE CASCADE
);
