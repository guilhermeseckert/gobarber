import AppError from '@shared/errors/AppError';
import FakeUserRepository from '../repositories/fakes/FakeUsersRepository';
import CreateUserService from './CreateUserServices';
import FakeHashProvider from '../provider/HashProvider/fakes/FakeHashProvider';

describe('CreateUser', () => {
  it('Should be able to create a new User', async () => {
    const fakeUserRepository = new FakeUserRepository();
    const fakeHashProvider = new FakeHashProvider();
    const createUserService = new CreateUserService(
      fakeUserRepository,
      fakeHashProvider,
    );

    const user = await createUserService.execute({
      name: 'Guilherme',
      email: 'guilherme@hotmail.com',
      password: '123456',
    });

    expect(user).toHaveProperty('id');
  });

  it('Should not be able to create a new user with saame email from another', async () => {
    const fakeUserRepository = new FakeUserRepository();
    const fakeHashProvider = new FakeHashProvider();
    const createUserService = new CreateUserService(
      fakeUserRepository,
      fakeHashProvider,
    );

    await createUserService.execute({
      name: 'Guilherme',
      email: 'guilherme@hotmail.com',
      password: '123456',
    });

    expect(
      createUserService.execute({
        name: 'Guilherme',
        email: 'guilherme@hotmail.com',
        password: '123456',
      }),
    ).rejects.toBeInstanceOf(AppError);
  });
});