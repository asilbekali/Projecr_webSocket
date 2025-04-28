import { BadRequestException, Injectable } from "@nestjs/common";
import { CreateChatDto } from "./dto/create-chat.dto";
import * as jwt from "jsonwebtoken";
import { PrismaService } from "src/prisma/prisma.service";

@Injectable()
export class ChatService {
    private readonly secretKey = "film";
    constructor(private readonly prisma: PrismaService) {}

    async createChat(data: CreateChatDto) {
        const bazaChat = await this.prisma.chat.findFirst({
            where: { toId: data.toId },
        });

        if (bazaChat) {
            throw new BadRequestException("Chat already exists !");
        }

        const chat = await this.prisma.chat.create({ data });
        return chat;
    }

    async deleteChat(id: string) {
        const bazaChat = await this.prisma.chat.findFirst({
            where: { id },
        });

        if (!bazaChat) {
            throw new BadRequestException("Chat does not exist!");
        }

        const deletedChat = await this.prisma.chat.delete({
            where: { id },
        });

        return {
            message: "Chat deleted successfully",
            deletedChat,
        };
    }

    async getChat(authHeader: string) {
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

            let chat = await this.prisma.chat.findMany({
                where: {
                    OR: [{ fromId: userId }, { toId: userId }],
                },
                include: {
                    from: true,
                    to: true,
                },
            });

            return chat;
        } catch (error) {
            if (error.name === "TokenExpiredError") {
                throw new BadRequestException("Token has expired!");
            }
            throw new BadRequestException("Invalid token!");
        }
    }
}
