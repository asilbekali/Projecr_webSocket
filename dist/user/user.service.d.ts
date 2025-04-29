import { CreateUserDto } from "./dto/create-user.dto";
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
    } | null>;
    register(data: CreateUserDto): Promise<{
        name: string;
        password: string;
        role: import(".prisma/client").$Enums.RoleUsers;
        id: string;
    }>;
    login(data: any): Promise<{
        token: string;
    }>;
    getUserData(): Promise<{
        name: string;
        password: string;
        role: import(".prisma/client").$Enums.RoleUsers;
        id: string;
    }[]>;
    validate(userName: string, password: string): Promise<{
        name: string;
        password: string;
        role: import(".prisma/client").$Enums.RoleUsers;
        id: string;
    } | null>;
}
