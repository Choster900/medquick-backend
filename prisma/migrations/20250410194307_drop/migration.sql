-- RedefineTables
PRAGMA defer_foreign_keys=ON;
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_security_permiso_profile" (
    "security_permiso_profile_id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "security_permission_id" INTEGER NOT NULL,
    "security_profile_id" INTEGER NOT NULL,
    "security_permiso_profile_created_at" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT "security_permiso_profile_security_permission_id_fkey" FOREIGN KEY ("security_permission_id") REFERENCES "security_permission" ("security_permission_id") ON DELETE CASCADE ON UPDATE CASCADE,
    CONSTRAINT "security_permiso_profile_security_profile_id_fkey" FOREIGN KEY ("security_profile_id") REFERENCES "security_profile" ("security_profile_id") ON DELETE CASCADE ON UPDATE CASCADE
);
INSERT INTO "new_security_permiso_profile" ("security_permiso_profile_created_at", "security_permiso_profile_id", "security_permission_id", "security_profile_id") SELECT "security_permiso_profile_created_at", "security_permiso_profile_id", "security_permission_id", "security_profile_id" FROM "security_permiso_profile";
DROP TABLE "security_permiso_profile";
ALTER TABLE "new_security_permiso_profile" RENAME TO "security_permiso_profile";
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;
