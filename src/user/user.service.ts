import { Injectable } from '@nestjs/common';
import { users } from '../mock/index';

@Injectable()
export class UserService {
  getUsers() {
    return users
  }
}
