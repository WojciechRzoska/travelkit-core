import { UserController } from './user.controller'
import { UserService } from './user.service'

let controller: UserController
let userServiceMock: Partial<UserService>

const createUserDto = {
  username: 'John123',
  email: 'john@example.com',
  password: 'Password123!',
  firstName: 'John',
  lastName: 'Doe',
  currentHashedRefreshToken: '',
}

const expectedUser = {
  id: 1,
  ...createUserDto,
  password: 'hashedPassword',
}

const expectedUsers = [
  { id: 1, username: 'John' },
  { id: 2, username: 'Doe' },
]

const updateUserDto = {
  username: 'John123',
}

const user = { id: 1, username: 'John', email: 'test@gmail.com' }

beforeEach(() => {
  userServiceMock = {
    create: jest.fn().mockResolvedValue(expectedUser),
    findAll: jest.fn().mockResolvedValue(expectedUsers),
    findById: jest.fn().mockResolvedValue(user),
    findByEmail: jest.fn().mockResolvedValue(user),
    findByUsername: jest.fn().mockResolvedValue(user),
    update: jest.fn().mockResolvedValue(updateUserDto),
    remove: jest.fn().mockResolvedValue(user),
  }

  controller = new UserController(userServiceMock as UserService)
})

describe('UserController', () => {
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
    const result = await controller.findBy({ id: '1' })

    expect(userServiceMock.findById).toHaveBeenCalled()
    expect(result).toEqual(user)
  })

  it('should update a user by id', async () => {
    const result = await controller.update('1', updateUserDto)

    expect(userServiceMock.update).toHaveBeenCalledWith(1, updateUserDto)
    expect(result.username).not.toEqual(user.username)
  })

  it('should return a user by email', async () => {
    const result = await controller.findBy({ email: 'test@gmail.com' })

    expect(userServiceMock.findByEmail).toHaveBeenCalled()
    expect(result).toEqual(user)
  })

  it('should return a user by username', async () => {
    const result = await controller.findBy({ username: 'John' })

    expect(userServiceMock.findByUsername).toHaveBeenCalled()
    expect(result).toEqual(user)
  })

  it('should remove a user by id', async () => {
    const result = await controller.remove('1')

    expect(userServiceMock.remove).toHaveBeenCalledWith(1)
    expect(result).toEqual(user)
  })
})
