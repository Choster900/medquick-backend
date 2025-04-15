import { PartialType } from '@nestjs/mapped-types';
import { RegisterUserDto } from './register-user.dto';
// TODO: dto para actualizar informacion del usuario
export class UpdateAuthDto extends PartialType(RegisterUserDto) {}
