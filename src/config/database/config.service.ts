import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { TypeOrmModuleOptions, TypeOrmOptionsFactory } from '@nestjs/typeorm';
import { SnakeNamingStrategy } from 'typeorm-naming-strategies';

@Injectable()
export class PostgresConfigService implements TypeOrmOptionsFactory {
  constructor(private configService: ConfigService) {}

  createTypeOrmOptions(): TypeOrmModuleOptions {
    return {
      type: 'postgres',
      host: this.configService.get<string>('DB_HOST'),
      port: this.configService.get<number>('DB_PORT'),
      username: this.configService.get<string>('DB_USER'),
      password: this.configService.get<string>('DB_PASSWORD'),
      database: this.configService.get<string>('DB_SCHEMA'),
      entities: ['dist/**/**/*.entity{.ts,.js}'],
      // DB는 Snake case, ts는 Camel case를 사용하기 때문에 db key 이름들이 매칭이 안됨
      // SnakeNamingStrategy(typeorm-naming-strategies)를 사용하면 알아서 Camel을 Snake case 형식으로 바꿔줌
      namingStrategy: new SnakeNamingStrategy(),
      synchronize: true,
      autoLoadEntities: true,
    };
  }
}
