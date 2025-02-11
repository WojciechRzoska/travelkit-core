import { UserController } from './user.controller'
import { UserService } from './user.service'

describe('UserController', () => {
  let controller: UserController
  let userServiceMock: Partial<UserService>

  const createUserDto = {
    name: 'John123',
    email: 'john@example.com',
    password: 'Password123!',
    firstName: 'John',
    lastName: 'Doe',
  }

  const expectedUser = {
    id: 1,
    ...createUserDto,
    password: 'hashedPassword',
  }

  const expectedUsers = [
    { id: 1, name: 'John' },
    { id: 2, name: 'Doe' },
  ]

  const updateUserDto = {
    name: 'John123',
  }

  const user = { id: 1, name: 'John' }

  beforeEach(() => {
    userServiceMock = {
      create: jest.fn().mockResolvedValue(expectedUser),
      findAll: jest.fn().mockResolvedValue(expectedUsers),
      findOne: jest.fn().mockResolvedValue(user),
      update: jest.fn().mockResolvedValue(updateUserDto),
      remove: jest.fn().mockResolvedValue(user),
    }

    controller = new UserController(userServiceMock as UserService)
  })

  it('should create a new user when valid data is provided', async () => {
    const result = await controller.create(createUserDto)

    expect(userServiceMock.create).toHaveBeenCalledWith(createUserDto)
    expect(result).toEqual(expectedUser)
  })

  it('should return all users', async () => {
    const result = await controller.findAll()

    expect(userServiceMock.findAll).toHaveBeenCalled()
    expect(result).toEqual(expectedUsers)
  })

  it('should return a user by id', async () => {
    const result = await controller.findOne('1')

    expect(userServiceMock.findOne).toHaveBeenCalled()
    expect(result).toEqual(user)
  })

  it('should update a user by id', async () => {
    const result = await controller.update('1', updateUserDto)

    expect(userServiceMock.update).toHaveBeenCalledWith(1, updateUserDto)
    expect(result.name).not.toEqual(user.name)
  })

  it('should remove a user by id', async () => {
    const result = await controller.remove('1')

    expect(userServiceMock.remove).toHaveBeenCalledWith(1)
    expect(result).toEqual(user)
  })
})
