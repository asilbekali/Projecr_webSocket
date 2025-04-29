import { Injectable, BadRequestException } from "@nestjs/common";
import { CreateUserDto } from "./dto/create-user.dto";
import { UpdateUserDto } from "./dto/update-user.dto";
import * as bcrypt from "bcrypt";
import { PrismaService } from "src/prisma/prisma.service";
import { JwtService } from "@nestjs/jwt";
import { RoleUsers } from "@prisma/client";

@Injectable()
export class UserService {
    constructor(
        private prisma: PrismaService,
        private jwt: JwtService
    ) {}

    async findUser(name: string) {
        const user = await this.prisma.user.findUnique({
            where: { name },
        });
        return user;
    }

    async register(data: CreateUserDto) {
        const existingUser = await this.findUser(data.name);
        if (existingUser) {
            throw new BadRequestException("User already exists!");
        }

        const hashedPassword = bcrypt.hashSync(data.password, 10);

        const userRole = data.role.toUpperCase() as RoleUsers;

        const newUser = await this.prisma.user.create({
            data: {
                name: data.name,
                password: hashedPassword,
                role: userRole,
            },
        });

        return newUser;
    }

    async login(data: any) {
        if (!data.name || !data.password) {
            throw new BadRequestException(
                "Name and password are required for login!"
            );
        }

        const user = await this.findUser(data.name);
        if (!user) {
            throw new BadRequestException("User not found");
        }

        if (data.password != user.password) {
            throw new BadRequestException("Passwor wrong");
        }

        const token = this.jwt.sign({
            id: user.id,
            role: user.role,
        });

        return { token };
    }

    async getUserData() {
        return await this.prisma.user.findMany();
    }

    async validate(userName: string, password: string) {
        const user = await this.prisma.user.findFirst({
            where: { name: userName },
        });
        

        if (user && (await bcrypt.compare(password, user.password))) {
            return user;
        } else {
            return null;
        }
    }
}
