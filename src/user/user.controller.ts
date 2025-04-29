import { Controller, Get, Post, Body, UseGuards, Req } from "@nestjs/common";
import { UserService } from "./user.service";
import { CreateUserDto } from "./dto/create-user.dto";
import { UpdateUserDto } from "./dto/update-user.dto";
import { ApiBody } from "@nestjs/swagger";
import { AuthGuard } from "@nestjs/passport";

@Controller("user")
export class UserController {
    constructor(private readonly userService: UserService) {}

    @Post("/register")
    async register(@Body() data: CreateUserDto) {
        return this.userService.register(data);
    }

    @UseGuards(AuthGuard("local"))
    @Post("/login")
    @ApiBody({
        description: "Login credentials",
        schema: {
            type: "object",
            properties: {
                name: { type: "string", example: "Alex" },
                password: { type: "string", example: "StronPassword_1" },
            },
        },
    })
    async login(@Req() data: Request) {
        return this.userService.login(data["user"]);
    }

    @UseGuards(AuthGuard("jwt"))
    @Get("/users")
    async meUser() {
        return this.userService.getUserData();
    }
}
