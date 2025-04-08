import { ApiProperty } from "@nestjs/swagger";
import { Gender } from "@prisma/client";

export class User {

    @ApiProperty({
        example: 'aa994459-8fd2-4fde-b355-8b5d766d042b'
    })
    user_id: number;
    @ApiProperty()
    branch_id: number | null;
    @ApiProperty()
    id_institucion: number | null;
    @ApiProperty()
    user_state_id: number;
    @ApiProperty()
    user_gender: Gender;
    @ApiProperty()
    user_first_name: string;
    @ApiProperty()
    user_second_name: string;
    @ApiProperty()
    user_third_name: string;
    @ApiProperty()
    user_first_lastname: string;
    @ApiProperty()
    user_second_lastname: string;
    @ApiProperty()
    user_third_lastname: string;
    @ApiProperty()
    user_email: string;
    @ApiProperty()
    user_password: string;
    @ApiProperty()
    user_dui: string;
    @ApiProperty()
    user_birthdate: Date;
    @ApiProperty()
    user_phone_number: string;
    @ApiProperty()
    user_address: string;
    @ApiProperty()
    user_create_at: Date;
    @ApiProperty()
    user_update_at: Date;
}
