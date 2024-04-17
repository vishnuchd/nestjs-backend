import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
} from '@nestjs/common';
import { Public } from 'src/auth/auth.guard';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { User } from './entity/user.entity';
import { UsersService } from './users.service';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Public()
  @Get()
  async getAllUser(): Promise<User[]> {
    return await this.usersService.getAllUser();
  }

  @Public()
  @Get('/:id')
  async getUserById(@Param('id') userId: number): Promise<User> {
    return await this.usersService.getUserById(userId);
  }

  @Public()
  @Post()
  async signUp(@Body() createUserDto: CreateUserDto): Promise<User> {
    return this.usersService.createUser(createUserDto);
  }

  @Public()
  @Delete('/:id')
  async deleteUser(@Param('id') userId: number): Promise<void> {
    // return을 안하면 insomnia에서 에러가 안오는 것 같다
    return this.usersService.deleteUser(userId);
  }

  @Public()
  @Patch('/:id')
  async updateUser(
    @Param('id') userId: number,
    @Body() updateUserDto: UpdateUserDto,
  ): Promise<void> {
    return this.usersService.updateUser(userId, updateUserDto);
  }
}
