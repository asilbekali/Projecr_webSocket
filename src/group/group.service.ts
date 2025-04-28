import { BadRequestException, Injectable } from "@nestjs/common";
import { CreateGroupDto } from "./dto/create-group.dto";
import { PrismaService } from "src/prisma/prisma.service";
import * as jwt from "jsonwebtoken";
import { CreateGroupMessageDto } from "./dto/create-group-message.dto";

@Injectable()
export class GroupService {
    private readonly secretKey = "film";

    constructor(private readonly prisma: PrismaService) {}

    async create(data: CreateGroupDto, authHeader: string) {
        if (!authHeader || !authHeader.startsWith("Bearer ")) {
            throw new BadRequestException("Invalid token format!");
        }

        const token = authHeader.split(" ")[1];
        const payload = jwt.verify(token, this.secretKey) as {
            id: string;
            [key: string]: any;
        };

        const userId = payload.id;
        if (!userId) {
            throw new BadRequestException("ID not found in token!");
        }

        return await this.prisma.group.create({
            data: {
                groupName: data.groupName,
                creatorId: userId,
            },
        });
    }

    async getGr(authHeader: string) {
        if (!authHeader || !authHeader.startsWith("Bearer ")) {
            throw new BadRequestException("Invalid token format!");
        }

        const token = authHeader.split(" ")[1];
        try {
            const payload = jwt.verify(token, this.secretKey) as {
                id: string;
                [key: string]: any;
            };

            const userId = payload.id;
            if (!userId) {
                throw new BadRequestException("ID not found in token!");
            }

            const groups = await this.prisma.group.findMany({
                where: {
                    OR: [{ creatorId: userId }, { groupName: userId }],
                },
            });

            return groups;
        } catch (error) {
            if (error.name === "TokenExpiredError") {
                throw new BadRequestException("Token has expired!");
            }
            throw new BadRequestException("Invalid token!");
        }
    }

    async messageGroup(
        authHeader: string,
        groupId: string,
        messageData: CreateGroupMessageDto
    ) {
        if (!authHeader || !authHeader.startsWith("Bearer ")) {
            throw new BadRequestException("Invalid token format!");
        }

        const token = authHeader.split(" ")[1];
        try {
            const payload = jwt.verify(token, this.secretKey) as {
                id: string;
                [key: string]: any;
            };

            const userId = payload.id;
            if (!userId) {
                throw new BadRequestException("ID not found in token!");
            }

            const group = await this.prisma.group.findUnique({
                where: { id: groupId },
            });

            if (!group) {
                throw new BadRequestException("Group not found!");
            }

            const groupMessage = await this.prisma.groupMessage.create({
                data: {
                    fromId: userId,
                    groupId: groupId,
                    text: messageData.text,
                },
            });

            return groupMessage;
        } catch (error) {
            if (error.name === "TokenExpiredError") {
                throw new BadRequestException("Token has expired!");
            }
            throw new BadRequestException("Invalid token!");
        }
    }
}
