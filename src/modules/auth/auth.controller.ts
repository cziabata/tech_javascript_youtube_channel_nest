import { Body, Controller, Post } from '@nestjs/common';
import { AuthService } from './auth.service';
import { CreateUserDTO } from '../user/dto';
import { UserLoginDTO } from './dto';
import { AuthUserResponse } from './response';

@Controller('auth')
export class AuthController {
  constructor(private readonly authSevice: AuthService) {}

  @Post("register")
  register(@Body() dto: CreateUserDTO): Promise<CreateUserDTO> {
    return this.authSevice.registerUser(dto);
  }

  @Post("login")
  login(@Body() dto: UserLoginDTO): Promise<AuthUserResponse>  {
    return this.authSevice.loginUser(dto);
  }
}
