import UserRepository from '../../../infra/repositories/user.repository.js';
import usersDb from '../../../infra/dbFake/users.db.js';

describe('UserRepository', () => {
  let userRepository;
  const testUser = {
    id: 1,
    name: 'John Doe',
    email: 'john.doe@example.com',
    password: 'password123',
    type: 'user',
  };

  beforeEach(() => {
    userRepository = new UserRepository();
    usersDb.length = 0;
  });

  it('should create a new user', async () => {
    const createdUser = await userRepository.create(testUser);

    expect(createdUser).toEqual(testUser);
    expect(usersDb).toContainEqual(testUser); 
  });

  it('should find all users', async () => {
    await userRepository.create(testUser);

    const users = await userRepository.findAll();

    expect(users).toHaveLength(1);
    expect(users[0]).toEqual(testUser);
  });

  it('should find a user by ID', async () => {
    await userRepository.create(testUser);

    const user = await userRepository.findById(testUser.id);

    expect(user).toEqual(testUser);
  });

  it('should return null when user by ID not found', async () => {
    const user = await userRepository.findById(999); 

    expect(user).toBeUndefined(); 
  });

  it('should find a user by email', async () => {
    await userRepository.create(testUser);

    const user = await userRepository.findByEmail(testUser.email);

    expect(user).toEqual(testUser);
  });

  it('should return null when user by email not found', async () => {
    const user = await userRepository.findByEmail('nonexistent@example.com'); 

    expect(user).toBeUndefined(); 
  });

  it('should update a user', async () => {
    await userRepository.create(testUser);

    const updatedUser = await userRepository.update(testUser.id, 'John Doe Updated', 'john.updated@example.com', 'newpassword123');

    expect(updatedUser.name).toBe('John Doe Updated');
    expect(updatedUser.email).toBe('john.updated@example.com');
    expect(updatedUser.password).toBe('newpassword123');
  });

  it('should change a users role to admin', async () => {
    await userRepository.create(testUser);

    const updatedUser = await userRepository.changeRole(testUser.id, 'admin');

    expect(updatedUser.type).toBe('admin');
  });

  it('should change a users role to user', async () => {
    await userRepository.create(testUser);

    const updatedUser = await userRepository.changeRole(testUser.id, 'user');

    expect(updatedUser.type).toBe('user');
  });

  it('should delete a user', async () => {
    await userRepository.create(testUser);

    const deletedUser = await userRepository.delete(testUser.id);

    expect(deletedUser).toEqual(testUser);
    expect(usersDb).not.toContainEqual(testUser); 
  });

  it('should return null when trying to delete a non-existent user', async () => {
    const deletedUser = await userRepository.delete(999); 

    expect(deletedUser).toBeNull(); 
  });
});
