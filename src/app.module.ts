import { Module } from "@nestjs/common";
import { AppController } from "./app.controller";
import { AppService } from "./app.service";
import { UserModule } from "./user/user.module";
import { ChatModule } from "./chat/chat.module";
import { PrismaModule } from "./prisma/prisma.module";
import { JwtGuardService } from "./jwt-guard/jwt-guard.service";
import { GroupModule } from './group/group.module';

@Module({
    imports: [UserModule, UserModule, ChatModule, PrismaModule, GroupModule],
    controllers: [AppController],
    providers: [AppService, JwtGuardService],
})
export class AppModule {}
