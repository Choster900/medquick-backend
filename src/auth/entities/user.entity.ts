export class User {

    user_id: number;
    branch_id: number | null;
    id_institucion: number | null;
    user_state_id: number;
    user_gender: boolean;

    user_first_name: string;
    user_second_name: string;
    user_third_name: string;
    user_first_lastname: string;
    user_second_lastname: string;
    user_third_lastname: string;
    user_email: string;
    user_password: string;
    user_dui: string;
    user_birthdate: Date;
    user_phone_number: string;
    user_address: string;
    user_create_at: Date;
    user_update_at: Date;
}
