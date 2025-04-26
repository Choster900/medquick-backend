// src/common/interfaces/current-user.interface.ts
export interface CurrentUser {
    user_id: string;
    user_email: string;
    user_first_name: string;
    user_second_name: string;
    user_first_lastname: string;
    user_second_lastname: string;
    user_gender: string;
    user_dui: string;
    user_phone_number: string;
    user_birthdate: Date;
    user_address: string;
    roles: string[]; // ← los nombres de los perfiles
}
