import { CreateChatDto } from "./dto/create-chat.dto";
import { PrismaService } from "src/prisma/prisma.service";
export declare class ChatService {
    private readonly prisma;
    private readonly secretKey;
    constructor(prisma: PrismaService);
    createChat(data: CreateChatDto): Promise<{
        id: string;
        createdAt: Date;
        fromId: string;
        toId: string;
    }>;
    deleteChat(id: string): Promise<{
        message: string;
        deletedChat: {
            id: string;
            createdAt: Date;
            fromId: string;
            toId: string;
        };
    }>;
    getChat(authHeader: string): Promise<({
        from: {
            name: string;
            password: string;
            role: import(".prisma/client").$Enums.RoleUsers;
            id: string;
            createdAt: Date;
        };
        to: {
            name: string;
            password: string;
            role: import(".prisma/client").$Enums.RoleUsers;
            id: string;
            createdAt: Date;
        };
    } & {
        id: string;
        createdAt: Date;
        fromId: string;
        toId: string;
    })[]>;
}
