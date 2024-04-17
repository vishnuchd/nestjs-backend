import { IsString } from 'class-validator';

export class BoardDto {
  @IsString()
  readonly title: string;

  @IsString()
  readonly thumbnail: string;

  @IsString()
  readonly date: string;

  @IsString()
  readonly content: string;
}
