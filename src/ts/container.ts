import { Container, injectable, inject } from "inversify";
import UserService from "./services/userService";
import { IUserService } from "./serviceInterfaces/IUserService";
import { makeProvideDecorator } from 'inversify-binding-decorators';

export let Symbols = {
    UserService: Symbol("UserService")
};

export let iocContainer = new Container();

iocContainer.bind<IUserService>(Symbols.UserService).to(UserService);
export let provide = makeProvideDecorator(iocContainer);