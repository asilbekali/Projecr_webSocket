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
exports.GroupService = void 0;
const common_1 = require("@nestjs/common");
const prisma_service_1 = require("../prisma/prisma.service");
const jwt = require("jsonwebtoken");
let GroupService = class GroupService {
    prisma;
    secretKey = "film";
    constructor(prisma) {
        this.prisma = prisma;
    }
    async create(data, authHeader) {
        if (!authHeader || !authHeader.startsWith("Bearer ")) {
            throw new common_1.BadRequestException("Invalid token format!");
        }
        const token = authHeader.split(" ")[1];
        const payload = jwt.verify(token, this.secretKey);
        const userId = payload.id;
        if (!userId) {
            throw new common_1.BadRequestException("ID not found in token!");
        }
        return await this.prisma.group.create({
            data: {
                groupName: data.groupName,
                creatorId: userId,
            },
        });
    }
    async getGr(authHeader) {
        if (!authHeader || !authHeader.startsWith("Bearer ")) {
            throw new common_1.BadRequestException("Invalid token format!");
        }
        const token = authHeader.split(" ")[1];
        try {
            const payload = jwt.verify(token, this.secretKey);
            const userId = payload.id;
            if (!userId) {
                throw new common_1.BadRequestException("ID not found in token!");
            }
            const groups = await this.prisma.group.findMany({
                where: {
                    OR: [{ creatorId: userId }, { groupName: userId }],
                },
            });
            return groups;
        }
        catch (error) {
            if (error.name === "TokenExpiredError") {
                throw new common_1.BadRequestException("Token has expired!");
            }
            throw new common_1.BadRequestException("Invalid token!");
        }
    }
    async messageGroup(authHeader, groupId, messageData) {
        if (!authHeader || !authHeader.startsWith("Bearer ")) {
            throw new common_1.BadRequestException("Invalid token format!");
        }
        const token = authHeader.split(" ")[1];
        try {
            const payload = jwt.verify(token, this.secretKey);
            const userId = payload.id;
            if (!userId) {
                throw new common_1.BadRequestException("ID not found in token!");
            }
            const group = await this.prisma.group.findUnique({
                where: { id: groupId },
            });
            if (!group) {
                throw new common_1.BadRequestException("Group not found!");
            }
            const groupMessage = await this.prisma.groupMessage.create({
                data: {
                    fromId: userId,
                    groupId: groupId,
                    text: messageData.text,
                },
            });
            return groupMessage;
        }
        catch (error) {
            if (error.name === "TokenExpiredError") {
                throw new common_1.BadRequestException("Token has expired!");
            }
            throw new common_1.BadRequestException("Invalid token!");
        }
    }
};
exports.GroupService = GroupService;
exports.GroupService = GroupService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService])
], GroupService);
//# sourceMappingURL=group.service.js.map