import { Strategy } from "passport-local";
import { UserService } from "../user.service";
declare const LocalStrategy_base: new (...args: [] | [options: import("passport-local").IStrategyOptionsWithRequest] | [options: import("passport-local").IStrategyOptions]) => Strategy & {
    validate(...args: any[]): unknown;
};
export declare class LocalStrategy extends LocalStrategy_base {
    private auth;
    constructor(auth: UserService);
    validate(name: string, password: string): Promise<{
        name: string;
        password: string;
        role: import(".prisma/client").$Enums.RoleUsers;
        id: string;
    }>;
}
export {};
