import { Controller, Get } from '@nestjs/common';
import { AppService } from './app.service';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  handleRoot(): string {
    return this.appService.getHello();
  }

  @Get('hello')
  getHello(): string {
    return "not default hello";
  }
}
