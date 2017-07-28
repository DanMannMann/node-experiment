import {Get, Route} from 'tsoa';
import { User } from '../models/user';

@Route('Users')
export class UsersController {
    @Get('{id}')
    public async getUser(id: number): Promise<User> {
        var item = new User(id, "e@mail.com", "Dave Jones", ["123", "456"]);
        return item;
        // return new Promise<User>((res,rej) =>
        // {
        //     res(item)
        // });
    }
}