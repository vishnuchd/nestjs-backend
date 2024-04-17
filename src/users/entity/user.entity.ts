import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class User {
  // PrimaryGeneratedColumn -> 유니크한 id 자동 생성
  // increment: id 1씩 증가, uuid: 유니크한 uuid 사용
  // increment가 default인 듯함
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  userId: string;

  @Column()
  userPassword: string;

  @Column()
  userName: string;

  @Column({ type: 'simple-array', nullable: true })
  todos: string[];
}
