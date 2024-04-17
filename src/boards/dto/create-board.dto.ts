import { IsNumber, IsString } from 'class-validator';

export class CreateBoardDto {
  @IsNumber()
  readonly userId: number;

  @IsString()
  readonly userName: string;

  @IsString()
  readonly title: string;

  @IsString()
  readonly thumbnail: string;

  @IsString()
  readonly date: string;

  @IsString()
  readonly content: string;
}
