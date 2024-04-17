import { Injectable } from '@nestjs/common';
import { UsersService } from 'src/users/users.service';
import { Todo } from './todos.controller';

@Injectable()
export class TodosService {
  constructor(private usersService: UsersService) {}

  async getAllTodos(userId: string): Promise<string[]> {
    const user = await this.usersService.getUserByUserId(userId);
    return user.todos;
  }

  async addTodo(userId: string, todo: Todo): Promise<void> {
    return this.usersService.addTodo(userId, todo.todo);
  }

  async deleteTodo(userId: string, todo: Todo): Promise<void> {
    return this.usersService.deleteTodo(userId, todo.todo);
  }
}
