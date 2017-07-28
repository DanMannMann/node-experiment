import { Get, Route } from 'tsoa';
import { User } from '../models/user';
import { Container, injectable, inject } from "inversify";
import { IUserService } from "../serviceInterfaces/IUserService";
import * as c from '../container';

@Route('Users')
@c.provide(UsersController) // Lets the route method find the controller from the IoC container
export class UsersController {
    private userService: IUserService;

    constructor(@inject(c.Symbols.UserService)userService: IUserService) {
        this.userService = userService;
    }

    @Get('{id}')
    public async getUser(id: number): Promise<User> {
        return this.userService.get(id);
    }
}