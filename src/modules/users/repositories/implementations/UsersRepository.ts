import { getRepository, Repository } from 'typeorm';
import { Game } from '../../../games/entities/Game';

import { IFindUserWithGamesDTO, IFindUserByFullNameDTO } from '../../dtos';
import { User } from '../../entities/User';
import { IUsersRepository } from '../IUsersRepository';

export class UsersRepository implements IUsersRepository {
  private repository: Repository<User>;

  constructor() {
    this.repository = getRepository(User);
  }

  async findUserWithGamesById({
    user_id,
  }: IFindUserWithGamesDTO): Promise<User | undefined> {
    // Complete usando ORM
    return await this.repository.findOne({id: user_id},{relations: ["games"]})
  }

  async findAllUsersOrderedByFirstName(): Promise<User[]> {
    // Complete usando raw query
    const query = "SELECT * FROM users ORDER BY first_name"
    return this.repository.query(query); 
  }

  async findUserByFullName({
    first_name,
    last_name,
  }: IFindUserByFullNameDTO): Promise<User[]> {
    // Complete usando raw query
    let fName = first_name.toLocaleLowerCase()
    let lName = last_name.toLocaleLowerCase()
    const query = `SELECT * FROM users WHERE LOWER(first_name) = '${fName}' AND LOWER(last_name) = '${lName}'`
    return this.repository.query(query); 
  }
}
