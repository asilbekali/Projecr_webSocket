import { UserService } from './user.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
export declare class UserController {
    private readonly userService;
    constructor(userService: UserService);
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
    meUser(): Promise<{
        name: string;
        password: string;
        role: import(".prisma/client").$Enums.RoleUsers;
        id: string;
        createdAt: Date;
    }[]>;
}
