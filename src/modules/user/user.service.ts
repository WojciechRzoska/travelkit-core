import { Injectable } from '@nestjs/common'
import { JwtService } from '@nestjs/jwt'
import { CreateUserDto } from './dto/create-user.dto'
import { UpdateUserDto } from './dto/update-user.dto'

import { PrismaService } from '@shared/modules/database/prisma.service'
import { EmailService } from '@shared/modules/email/email.service'
import { PasswordService } from '@shared/modules/password/password.service'
import handlePrismaError from 'src/utils/handlePrismaError'

@Injectable()
export class UserService {
  constructor(
    private readonly prismaService: PrismaService,
    private readonly passwordService: PasswordService,
    private readonly jwtService: JwtService,
    private readonly emailService: EmailService,
  ) {}

  async create(createUserDto: CreateUserDto) {
    const { password, ...restCreateUserDto } = createUserDto
    const hashedPassword = await this.passwordService.hashPassword(password)

    try {
      const user = await this.prismaService.user.create({
        data: { password: hashedPassword, ...restCreateUserDto },
      })

      await this.emailService.sendWelcomeEmail(user.email)

      return user
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

  async setPasswordResetToken(email: string): Promise<string> {
    const user = await this.findByEmail(email)
    if (!user) {
      throw new Error('User not found')
    }

    const token = await this.jwtService.signAsync(
      { sub: user.id, email: user.email },
      { expiresIn: '1h' },
    )

    const expiresAt = new Date(Date.now() + 3600000) // 1 godzina

    await this.prismaService.passwordResetToken.create({
      data: {
        token,
        expiresAt,
        userId: user.id,
      },
    })

    return token
  }

  async resetPassword(token: string, newPassword: string): Promise<boolean> {
    const resetToken = await this.prismaService.passwordResetToken.findFirst({
      where: {
        token,
        expiresAt: {
          gt: new Date(),
        },
        isUsed: false,
      },
      include: {
        user: true,
      },
    })

    if (!resetToken) {
      return false
    }

    const hashedPassword = await this.passwordService.hashPassword(newPassword)

    await this.prismaService.$transaction([
      // Aktualizacja hasła użytkownika
      this.prismaService.user.update({
        where: { id: resetToken.userId },
        data: { password: hashedPassword },
      }),
      // Oznaczenie tokenu jako wykorzystanego
      this.prismaService.passwordResetToken.update({
        where: { id: resetToken.id },
        data: { isUsed: true },
      }),
    ])

    return true
  }

  // Dodatkowa metoda do czyszczenia starych tokenów (można używać w cronie)
  async cleanupOldPasswordResetTokens() {
    const now = new Date()
    await this.prismaService.passwordResetToken.deleteMany({
      where: {
        OR: [{ expiresAt: { lt: now } }, { isUsed: true }],
      },
    })
  }
}
