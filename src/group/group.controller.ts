import {
    Controller,
    Get,
    Post,
    Body,
    Request,
    UseGuards,
    Param,
} from "@nestjs/common";
import { GroupService } from "./group.service";
import { CreateGroupDto } from "./dto/create-group.dto";
import { AuthGuard } from "src/auth/auth.guard";
import { CreateGroupMessageDto } from "./dto/create-group-message.dto";

@UseGuards(AuthGuard)
@Controller("group")
export class GroupController {
    constructor(private readonly groupService: GroupService) {}

    @Post()
    create(@Body() createGroupDto: CreateGroupDto, @Request() req) {
        const creatorId = req.headers.authorization;
        return this.groupService.create(createGroupDto, creatorId);
    }

    @Get()
    findGroup(@Request() req) {
        const authHeader = req.headers.authorization;
        return this.groupService.getGr(authHeader);
    }

    @Post("/message-group")
    sendMessage(
        @Param("groupId") groupId: string,
        @Body() createGroupMessageDto: CreateGroupMessageDto,
        @Request() req
    ) {
        const authHeader = req.headers.authorization;
        return this.groupService.messageGroup(
            groupId,
            authHeader,
            createGroupMessageDto
        );
    }
}
