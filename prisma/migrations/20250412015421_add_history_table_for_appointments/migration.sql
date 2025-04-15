-- CreateTable
CREATE TABLE "appointment_status_history" (
    "appointment_status_history_id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "medical_appointment_id" TEXT NOT NULL,
    "previous_status_id" INTEGER NOT NULL,
    "new_status_id" INTEGER NOT NULL,
    "fecha_hora" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT "appointment_status_history_medical_appointment_id_fkey" FOREIGN KEY ("medical_appointment_id") REFERENCES "medical_appointment" ("medical_appointment_id") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "appointment_status_history_previous_status_id_fkey" FOREIGN KEY ("previous_status_id") REFERENCES "medical_appointment_state" ("medical_appointment_state_id") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "appointment_status_history_new_status_id_fkey" FOREIGN KEY ("new_status_id") REFERENCES "medical_appointment_state" ("medical_appointment_state_id") ON DELETE RESTRICT ON UPDATE CASCADE
);
