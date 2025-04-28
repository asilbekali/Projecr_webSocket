import { GroupService } from "./group.service";
import { CreateGroupDto } from "./dto/create-group.dto";
import { CreateGroupMessageDto } from "./dto/create-group-message.dto";
export declare class GroupController {
    private readonly groupService;
    constructor(groupService: GroupService);
    create(createGroupDto: CreateGroupDto, req: any): Promise<{
        id: string;
        groupName: string;
        creatorId: string;
        createdAt: Date;
    }>;
    findGroup(req: any): Promise<{
        id: string;
        groupName: string;
        creatorId: string;
        createdAt: Date;
    }[]>;
    sendMessage(groupId: string, createGroupMessageDto: CreateGroupMessageDto, req: any): Promise<{
        id: string;
        createdAt: Date;
        fromId: string;
        groupId: string;
        text: string;
    }>;
}
