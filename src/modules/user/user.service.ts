import { Injectable } from '@nestjs/common'
import { CreateUserDto } from './dto/create-user.dto'
import { UpdateUserDto } from './dto/update-user.dto'

import { PrismaService } from '@shared/modules/database/prisma.service'
import { PasswordService } from '@shared/modules/password/password.service'
import handlePrismaError from 'src/utils/handlePrismaError'

@Injectable()
export class UserService {
  constructor(
    private readonly prismaService: PrismaService,
    private readonly passwordService: PasswordService,
  ) {}

  async create(createUserDto: CreateUserDto) {
    const { password, ...restCreateUserDto } = createUserDto
    const hashedPassword = await this.passwordService.hashPassword(password)

    try {
      return await this.prismaService.user.create({
        data: { password: hashedPassword, ...restCreateUserDto },
      })
    } catch (error) {
      throw handlePrismaError(error)
    }
  }

  findAll() {
    return this.prismaService.user.findMany()
  }

  findById(id: number) {
    return this.prismaService.user.findUnique({ where: { id } })
  }

  findByEmail(email: string) {
    return this.prismaService.user.findFirst({
      where: {
        email: {
          equals: email,
          mode: 'insensitive',
        },
      },
    })
  }

  findByUsername(username: string) {
    return this.prismaService.user.findFirst({
      where: {
        username: {
          equals: username,
          mode: 'insensitive',
        },
      },
    })
  }

  update(id: number, updateUserDto: UpdateUserDto) {
    try {
      return this.prismaService.user.update({
        where: { id },
        data: updateUserDto,
      })
    } catch (error) {
      throw handlePrismaError(error)
    }
  }

  updateRefreshToken(id: number, refreshToken: string | null) {
    return this.prismaService.user.update({
      where: { id },
      data: { currentHashedRefreshToken: refreshToken },
    })
  }

  remove(id: number) {
    return this.prismaService.user.delete({ where: { id } })
  }
}
