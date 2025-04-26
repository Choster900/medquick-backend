import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { JwtModule } from '@nestjs/jwt';
import { envs } from 'src/config';
import { JwtStrategy } from './strategies/jwt.strategy';

@Module({
    controllers: [AuthController],
    providers: [AuthService, JwtStrategy],
    imports: [
        JwtModule.registerAsync({
            imports: [],
            inject: [],
            useFactory: () => {

                return {
                    secret: envs.JWT_SECRET,
                    signOptions: {
                        expiresIn: '2h'
                    }
                }
            }
        })
    ],
    exports: [JwtStrategy, JwtModule/* , PassportModule, JwtModule */]
})
export class AuthModule { }
