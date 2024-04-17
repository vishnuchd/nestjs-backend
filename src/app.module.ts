import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';

import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PostgresConfigModule } from './config/database/config.module';
import { PostgresConfigService } from './config/database/config.service';
import { UsersModule } from './users/users.module';
import { DataSource } from 'typeorm';
import { AuthModule } from './auth/auth.module';
import { TodosModule } from './todos/todos.module';
import { BoardsModule } from './boards/boards.module';

@Module({
  imports: [
    // .env 설정 -> @nestjs/config
    ConfigModule.forRoot({ isGlobal: true }),
    // Typeorm Postgre DB 설정 -> @nestjs/typeorm
    TypeOrmModule.forRootAsync({
      imports: [PostgresConfigModule],
      useClass: PostgresConfigService,
      inject: [PostgresConfigService],
    }),
    UsersModule,
    AuthModule,
    TodosModule,
    BoardsModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {
  constructor(private dataSource: DataSource) {}
}
