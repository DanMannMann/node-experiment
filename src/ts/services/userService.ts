import { IUserService } from "../serviceInterfaces/IUserService";
import {User} from '../models/user';
import { injectable } from "inversify";

@injectable()
export default class UserService implements IUserService {
    public get(id: number): User {
        return new User(id, "e@mail.com", "Dave Jones", ["123", "456"]);
    }
}