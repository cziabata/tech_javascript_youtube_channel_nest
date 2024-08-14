import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UserModule } from '../user/user.module';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { SequelizeModule } from '@nestjs/sequelize';
import configurations from 'src/configurations';
import { User } from 'src/user/models/user.model';

@Module({
  imports: [
    // set work of ConfigModule on global level 
    // forRoot - use for global settings, forFeature - use for settings inside Module
    ConfigModule.forRoot({
    isGlobal: true,
    // connect config from src/configurations/index.ts, after that configService.get('port') will be able to return value
    load: [configurations],
  }), 
  SequelizeModule.forRootAsync({
    imports: [ConfigModule],
    inject: [ConfigService],
    // useFactory використовується для динамічного додавання провайдерів
    useFactory: (configService: ConfigService) => ({
      dialect: "postgres",
      host: configService.get("db_host"),
      port: configService.get("db_port"),
      username: configService.get("db_user"),
      password: configService.get("db_password"),
      database: configService.get("db_name"),
      synchronize: true,
      autoLoadModels: true,
      models: [User],
    })
  }),
  UserModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
