import { ChatService } from "./chat.service";
import { CreateChatDto } from "./dto/create-chat.dto";
import { CreateMessageDto } from "./dto/create-message.dto copy";
export declare class ChatController {
    private readonly chatService;
    constructor(chatService: ChatService);
    create(createChatDto: CreateChatDto): Promise<{
        id: string;
        createdAt: Date;
        fromId: string;
        toId: string;
    }>;
    findAll(req: any): Promise<({
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
    findAllMessage(req: any): Promise<({
        chat: {
            id: string;
            createdAt: Date;
            fromId: string;
            toId: string;
        };
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
        chatId: string;
        text: string;
    })[]>;
    createMessage(data: CreateMessageDto): Promise<{
        id: string;
        createdAt: Date;
        fromId: string;
        toId: string;
        chatId: string;
        text: string;
    }>;
}
