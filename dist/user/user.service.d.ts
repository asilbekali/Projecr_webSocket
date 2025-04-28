import { CreateUserDto } from "./dto/create-user.dto";
import { UpdateUserDto } from "./dto/update-user.dto";
import { PrismaService } from "src/prisma/prisma.service";
import { JwtService } from "@nestjs/jwt";
export declare class UserService {
    private prisma;
    private jwt;
    constructor(prisma: PrismaService, jwt: JwtService);
    findUser(name: string): Promise<{
        name: string;
        password: string;
        role: import(".prisma/client").$Enums.RoleUsers;
        id: string;
        createdAt: Date;
    } | null>;
    register(data: CreateUserDto): Promise<{
        name: string;
        password: string;
        role: import(".prisma/client").$Enums.RoleUsers;
        id: string;
        createdAt: Date;
    }>;
    login(data: UpdateUserDto): Promise<{
        token: string;
    }>;
    getUserData(): Promise<{
        name: string;
        password: string;
        role: import(".prisma/client").$Enums.RoleUsers;
        id: string;
        createdAt: Date;
    }[]>;
}
