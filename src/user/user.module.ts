import { Module } from "@nestjs/common";
import { JwtModule } from "@nestjs/jwt";
import { UserController } from "./user.controller";
import { UserService } from "./user.service";
import { PrismaService } from "src/prisma/prisma.service";
import { LocalStrategy } from "./strategies/local.strategies";
import { PassportModule } from "@nestjs/passport";
import { JwtStrategy } from "./strategies/jwt.strategy";

@Module({
    imports: [
        JwtModule.register({
            secret: "film",
            global: true,
        }),
        PassportModule,
    ],
    controllers: [UserController],
    providers: [UserService, PrismaService, LocalStrategy, JwtStrategy],
})
export class UserModule {}
