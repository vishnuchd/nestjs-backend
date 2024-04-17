import { Repository } from 'typeorm';
import { CustomRepository } from 'src/custom-repository/typeorm-ex.decorator';
import { Board } from './entity/board.entity';

@CustomRepository(Board)
export class BoardRepository extends Repository<Board> {}
