import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { User } from './models/user.model';
import * as bcrypt from 'bcrypt';
import { CreateUserDTO } from './dto';
import { APP_ERRORS } from 'src/common/errors';

@Injectable()
export class UserService {
  constructor(@InjectModel(User) private readonly userRpository: typeof User) {}

  async hashPassword(password) {
    return bcrypt.hash(password, 10)
  }

  async findUserByEmail(email: string) {
    return this.userRpository.findOne({ where: { email } })
  }

  async createUser(dto: CreateUserDTO): Promise<CreateUserDTO> {
    const existUser = await this.findUserByEmail(dto.email);

    if(existUser) {
      throw new BadRequestException(APP_ERRORS.USER_EXIST)
    }

    dto.password = await this.hashPassword(dto.password); 
    await this.userRpository.create({
      firstName: dto.firstName,
      username: dto.username,
      email: dto.email,
      password: dto.password
    });
    return dto
  }
}
