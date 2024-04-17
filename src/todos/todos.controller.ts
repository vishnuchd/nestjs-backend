import { Body, Controller, Delete, Get, Post, Request } from '@nestjs/common';
import { Public } from 'src/auth/auth.guard';
import { UpdateUserDto } from 'src/users/dto/update-user.dto';
import { UsersService } from 'src/users/users.service';
import { TodosService } from './todos.service';

export type Todo = {
  todo: string;
};

@Controller('todos')
export class TodosController {
  constructor(private readonly todosService: TodosService) {}

  @Get()
  async getAllTodos(@Request() req): Promise<string[]> {
    return this.todosService.getAllTodos(req.user.userId);
  }

  @Post()
  async addTodo(@Request() req, @Body() todo: Todo): Promise<void> {
    return this.todosService.addTodo(req.user.userId, todo);
  }

  @Delete()
  async deleteTodo(@Request() req, @Body() todo: Todo): Promise<void> {
    return this.todosService.deleteTodo(req.user.userId, todo);
  }
}
