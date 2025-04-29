import { ApiProperty } from "@nestjs/swagger";
import { Role } from "../enum/role.enum";

export class CreateUserDto {
    @ApiProperty({
        description: "User name",
        example: "Alex",
    })
    name: string;

    @ApiProperty({
        description: "User password",
        example: "StronPassword_1",
    })
    password: string;

    @ApiProperty({
        description: "User role",
        example: "admin",
    })
    role: Role;
}
