import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Board {
  @PrimaryGeneratedColumn()
  boardId: number;

  @Column()
  userId: number;

  @Column()
  userName: string;

  @Column()
  title: string;

  @Column()
  thumbnail: string;

  @Column()
  date: string;

  @Column()
  content: string;
}
