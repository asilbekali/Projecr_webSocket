import { ChatService } from "./chat.service";
import { CreateChatDto } from "./dto/create-chat.dto";
export declare class ChatController {
    private readonly chatService;
    constructor(chatService: ChatService);
    create(createChatDto: CreateChatDto): Promise<{
        id: string;
        fromId: string;
        toId: string;
        createdAt: Date;
    }>;
    findAll(req: any): Promise<{
        id: string;
        fromId: string;
        toId: string;
        createdAt: Date;
    }[]>;
}
