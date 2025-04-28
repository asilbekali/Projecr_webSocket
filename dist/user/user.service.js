"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserService = void 0;
const common_1 = require("@nestjs/common");
const bcrypt = require("bcrypt");
const prisma_service_1 = require("../prisma/prisma.service");
const jwt_1 = require("@nestjs/jwt");
let UserService = class UserService {
    prisma;
    jwt;
    constructor(prisma, jwt) {
        this.prisma = prisma;
        this.jwt = jwt;
    }
    async findUser(name) {
        const user = await this.prisma.user.findUnique({
            where: { name },
        });
        return user;
    }
    async register(data) {
        const existingUser = await this.findUser(data.name);
        if (existingUser) {
            throw new common_1.BadRequestException("User already exists!");
        }
        const hashedPassword = bcrypt.hashSync(data.password, 10);
        const userRole = data.role.toUpperCase();
        const newUser = await this.prisma.user.create({
            data: {
                name: data.name,
                password: hashedPassword,
                role: userRole,
            },
        });
        return newUser;
    }
    async login(data) {
        if (!data.name || !data.password) {
            throw new common_1.BadRequestException("Name and password are required for login!");
        }
        const user = await this.findUser(data.name);
        if (!user) {
            throw new common_1.BadRequestException("User not found");
        }
        const isPasswordValid = bcrypt.compareSync(data.password, user.password);
        if (!isPasswordValid) {
            throw new common_1.BadRequestException("Invalid password!");
        }
        const token = this.jwt.sign({
            id: user.id,
            role: user.role,
        });
        return { token };
    }
    async getUserData() {
        console.log("keldi");
        return await this.prisma.user.findMany();
    }
};
exports.UserService = UserService;
exports.UserService = UserService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService,
        jwt_1.JwtService])
], UserService);
//# sourceMappingURL=user.service.js.map