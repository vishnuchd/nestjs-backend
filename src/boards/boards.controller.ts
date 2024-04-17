import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  Request,
} from '@nestjs/common';
import { BoardsService } from './boards.service';
import { BoardDto } from './dto/board-dto';
import { CreateBoardDto } from './dto/create-board.dto';
import { UpdateBoardDto } from './dto/update-board.dto';
import { Board } from './entity/board.entity';

export type UserToken = {id: number, userId: string}

@Controller('boards')
export class BoardsController {
  constructor(private readonly boardsService: BoardsService) {}

  @Get()
  async getAllBoard(): Promise<Board[]> {
    return await this.boardsService.getAllBoard();
  }

  @Get('/:id')
  async getBoardById(@Param('id') boardId: number): Promise<Board> {
    return await this.boardsService.getBoardById(boardId);
  }

  @Post()
  async addBoard(@Request() req, @Body() boardDto: BoardDto): Promise<Board> {
    const user = {
      id: req.user.sub,
      userId: req.user.userId
    }
    return await this.boardsService.addBoard(user, boardDto);
  }

  @Delete('/:id')
  async deleteBoard(@Param('id') boardId: number): Promise<void> {
    return this.boardsService.deleteBoard(boardId);
  }

  @Patch('/:id')
  async updateBoard(
    @Param('id') boardId: number,
    @Body() updateBoardDto: UpdateBoardDto,
  ): Promise<void> {
    return this.boardsService.updateBoard(boardId, updateBoardDto);
  }
}
