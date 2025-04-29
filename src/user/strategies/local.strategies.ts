import { Strategy } from "passport-local";
import { PassportStrategy } from "@nestjs/passport";
import { Injectable, UnauthorizedException } from "@nestjs/common";
import { UserService } from "../user.service";

@Injectable()
export class LocalStrategy extends PassportStrategy(Strategy, "local") {
    constructor(private auth: UserService) {
        super({
            usernameField: "name",
            passwordField: "password",
        });
    }

    async validate(name: string, password: string) {
        const user = await this.auth.validate(name, password);
        if (!user) {
            throw new UnauthorizedException("Login yoki parol noto‘g‘ri!");
        }
        return user;
    }
}
