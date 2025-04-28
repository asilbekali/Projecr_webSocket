import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UserModule } from './user/user.module';
import { UserGuard } from './user/user.guard';
import { ChatModule } from './chat/chat.module';
import { PrismaModule } from './prisma/prisma.module';
import { JwtGuardService } from './jwt-guard/jwt-guard.service';

@Module({
  imports: [UserModule, UserModule, ChatModule, PrismaModule],
  controllers: [AppController],
  providers: [AppService, UserGuard, JwtGuardService],
})
export class AppModule {}
