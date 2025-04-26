export interface AppointmentStatusChangeDto {
    medicalAppointmentId: string;
    previousStatusId: number;
    newStatusId: number;
}
