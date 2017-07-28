import {User} from '../models/user';

export interface IUserService {
    get(id: number): User;
}