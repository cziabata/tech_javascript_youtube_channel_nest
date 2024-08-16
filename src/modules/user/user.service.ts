import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { User } from './models/user.model';
import * as bcrypt from 'bcrypt';
import { CreateUserDTO, UpdateUserDTO } from './dto';
import { WatchList } from '../watchlist/models/watchlist.model';

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
    dto.password = await this.hashPassword(dto.password); 
    await this.userRpository.create({
      firstName: dto.firstName,
      username: dto.username,
      email: dto.email,
      password: dto.password
    });
    return dto
  }

  async publicUser(email: string) {
    return this.userRpository.findOne({
      where: { email },
      attributes: { exclude: ["password"]},
      include: {
        model: WatchList,
        required: false
      }
    })
  }

  async updateUser(email: string, dto: UpdateUserDTO): Promise<UpdateUserDTO> {
    await this.userRpository.update(dto, { where: { email } });
    return dto
  }

  async deleteUser(email: string): Promise<boolean> {
    await this.userRpository.destroy({ where: { email } });
    return true
  }

 }
