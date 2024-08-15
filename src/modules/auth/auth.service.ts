import { BadRequestException, Injectable } from '@nestjs/common';
import { UserService } from '../user/user.service';
import { CreateUserDTO } from '../user/dto';
import { APP_ERRORS } from 'src/common/constants/errors';
import { UserLoginDTO } from './dto';
import * as bcrypt from 'bcrypt';
import { AuthUserResponse } from './response';

@Injectable()
export class AuthService {
  constructor(private readonly userService: UserService ) {}

  async registerUser(dto: CreateUserDTO): Promise<CreateUserDTO> {
    const existUser = await this.userService.findUserByEmail(dto.email);
    if(existUser) throw new BadRequestException(APP_ERRORS.USER_EXIST);
    return this.userService.createUser(dto);
  }

  async loginUser(dto: UserLoginDTO): Promise<AuthUserResponse> {
    const existUser = await this.userService.findUserByEmail(dto.email);
    if(!existUser) throw new BadRequestException(APP_ERRORS.USER_NOT_EXIST);
    const validatePassword = await bcrypt.compare(dto.password, existUser.password);
    if(!validatePassword) throw new BadRequestException(APP_ERRORS.WRONG_DATA);
    return existUser;
  }
}
