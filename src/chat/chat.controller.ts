import { ChatService } from "./chat.service";
import { CreateChatDto } from "./dto/create-chat.dto";
import { AuthGuard } from "src/auth/auth.guard";
import {
    Controller,
    Get,
    Post,
    Body,
    Patch,
    Param,
    Delete,
    Query,
    UseGuards,
    Headers,
    Request,
} from "@nestjs/common";

@UseGuards(AuthGuard)
@Controller("chat")
export class ChatController {
    constructor(private readonly chatService: ChatService) {}

    @Post()
    create(@Body() createChatDto: CreateChatDto) {
        return this.chatService.createChat(createChatDto);
    }

    @Get()
    findAll(@Request() req) {
        const authHeader = req.headers.authorization;
        return this.chatService.getChat(authHeader);
    }
}
