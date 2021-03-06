import User from '../infra/typeorm/entities/User';
import ICreateUserDTO from '../dtos/IcreateUserDTO';
import IFindAllProvidersDTO from '../dtos/IFindAllProvidersDTO';

export default interface IUserRepository {
  findAllProviders(data: IFindAllProvidersDTO): Promise<User[]>;
  findById(id: string): Promise<User | undefined>;
  findByEmail(email: string): Promise<User | undefined>;
  create(date: ICreateUserDTO): Promise<User>;
  save(user: User): Promise<User>;
}
