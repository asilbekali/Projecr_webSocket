import { CreateGroupDto } from "./dto/create-group.dto";
import { PrismaService } from "src/prisma/prisma.service";
import { CreateGroupMessageDto } from "./dto/create-group-message.dto";
export declare class GroupService {
    private readonly prisma;
    private readonly secretKey;
    constructor(prisma: PrismaService);
    create(data: CreateGroupDto, authHeader: string): Promise<{
        id: string;
        groupName: string;
        creatorId: string;
        createdAt: Date;
    }>;
    getGr(authHeader: string): Promise<{
        id: string;
        groupName: string;
        creatorId: string;
        createdAt: Date;
    }[]>;
    messageGroup(authHeader: string, groupId: string, messageData: CreateGroupMessageDto): Promise<{
        id: string;
        createdAt: Date;
        fromId: string;
        groupId: string;
        text: string;
    }>;
}
