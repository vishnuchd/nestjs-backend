import {
  HttpException,
  HttpStatus,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { User } from './entity/user.entity';
import { UsersRepository } from './users.repository';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private userRepository: UsersRepository,
  ) {}

  // 모든 유저 정보 받기
  async getAllUser(): Promise<User[]> {
    return this.userRepository.find();
  }

  // id로 유저 찾기
  async getUserById(id: number): Promise<User> {
    const user = await this.userRepository.findOneBy({ id });
    if (!user) {
      throw new NotFoundException(`User with Id ${id} not found`);
    }
    return user;
  }

  // userId로 유저 찾기 -> auth signIn에서 사용
  async getUserByUserId(userId: string): Promise<User> {
    const user = await this.userRepository
      .createQueryBuilder('user')
      .where('user.userId = :userId', { userId })
      .getOne();
    if (!user) {
      throw new NotFoundException(`User with user id ${userId} not found`);
    }
    return user;
  }

  // 회원 가입
  async createUser(createUserDto: CreateUserDto): Promise<User> {
    const userId = createUserDto.userId;
    const existUser = await this.userRepository
      .createQueryBuilder('user')
      .where('user.userId = :userId', { userId })
      .select(['user.userId'])
      .getOne();
    if (existUser) {
      throw new HttpException('User id already exists', HttpStatus.BAD_REQUEST);
    }
    const user = this.userRepository.create(createUserDto);
    await this.userRepository.save(user);
    return user;
  }

  // 계정 탈퇴
  async deleteUser(id: number): Promise<void> {
    const result = await this.userRepository.delete(id);
    if (result.affected === 0) {
      throw new NotFoundException(`User with Id ${id} not found`);
    }
  }

  // id로 유저 정보 업데이트
  async updateUser(id: number, updateUserDto: UpdateUserDto): Promise<void> {
    this.userRepository.update(id, updateUserDto);
  }

  makeUpdateUser(user: User): User {
    const updateUser = {
      ...user,
      todos: user.todos,
    };
    return updateUser;
  }

  async addTodo(userId: string, todo: string): Promise<void> {
    const user = await this.getUserByUserId(userId);
    if (user.todos === null) {
      user.todos = [];
    }
    user.todos = [todo, ...user.todos];
    this.userRepository.update(user.id, this.makeUpdateUser(user));
  }

  async deleteTodo(userId: string, todo: string): Promise<void> {
    const user = await this.getUserByUserId(userId);
    if (user.todos === null) {
      throw new NotFoundException(
        `User with userId ${userId} have nothing to do`,
      );
    }
    const todoIndex = user.todos.findIndex((e) => e == todo);
    if (todoIndex < 0) {
      throw new NotFoundException(
        `User with userId ${userId} does not have todo ${todo}`,
      );
    }
    user.todos.splice(todoIndex, 1);
    this.userRepository.update(user.id, this.makeUpdateUser(user));
  }
}
