import { Injectable, OnModuleInit, UnauthorizedException } from "@nestjs/common";
import { PassportStrategy } from "@nestjs/passport";
import { PrismaClient, User } from "@prisma/client";
import { ExtractJwt, Strategy } from "passport-jwt";

import { JwtPayload } from "../interfaces/jwt-payload.interface";
import { envs } from "src/config";


@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) implements OnModuleInit {
    private prisma: PrismaClient;

    constructor() {
        super({
            jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
            //ignoreExpiration: false,
            secretOrKey: envs.JWT_SECRET,
        });

        this.prisma = new PrismaClient();
    }

    async onModuleInit() {
        await this.prisma.$connect();
    }

    async validate(payload: JwtPayload): Promise<User> {

        const { userEmail } = payload

        const user = await this.prisma.user.findUnique({
            where: { user_email: userEmail }
        });

        if (!user)
            throw new UnauthorizedException('Token not valid');


        return user;
    }
}
