import { CreateChatDto } from "./dto/create-chat.dto";
import { PrismaService } from "src/prisma/prisma.service";
export declare class ChatService {
    private readonly prisma;
    private readonly secretKey;
    constructor(prisma: PrismaService);
    createChat(data: CreateChatDto): Promise<{
        id: string;
        fromId: string;
        toId: string;
        createdAt: Date;
    }>;
    deleteChat(id: string): Promise<{
        message: string;
        deletedChat: {
            id: string;
            fromId: string;
            toId: string;
            createdAt: Date;
        };
    }>;
    getChat(authHeader: string): Promise<{
        id: string;
        fromId: string;
        toId: string;
        createdAt: Date;
    }[]>;
}
