-- CreateTable
CREATE TABLE "users_specialty" (
    "users_branches_specialty_id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "user_id" TEXT NOT NULL,
    "specialty_id" INTEGER NOT NULL,
    "users_branches_specialty_created_at" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "users_branches_specialty_update_at" DATETIME NOT NULL,
    CONSTRAINT "users_specialty_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "user" ("user_id") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "users_specialty_specialty_id_fkey" FOREIGN KEY ("specialty_id") REFERENCES "specialty" ("specialty_id") ON DELETE RESTRICT ON UPDATE CASCADE
);
