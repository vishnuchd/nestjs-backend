import { CustomRepository } from 'src/custom-repository/typeorm-ex.decorator';
import { Repository } from 'typeorm';
import { User } from './entity/user.entity';

@CustomRepository(User)
export class UsersRepository extends Repository<User> {}
