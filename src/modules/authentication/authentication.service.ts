import { LoginDto } from '@modules/authentication/dto/login.dto'
import { RequestPasswordResetDto } from '@modules/authentication/dto/request-password-reset.dto'
import { ResetPasswordDto } from '@modules/authentication/dto/reset-password.dto'
import { UserService } from '@modules/user/user.service'
import {
  BadRequestException,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common'
import { PrismaService } from '@shared/modules/database/prisma.service'
import { EmailService } from '@shared/modules/email/email.service'
import { PasswordService } from '@shared/modules/password/password.service'
import { TokenService } from '@shared/modules/token/token.service'
import { isEmail } from 'class-validator'

@Injectable()
export class AuthenticationService {
  constructor(
    private readonly userService: UserService,
    private readonly passwordService: PasswordService,
    private readonly tokenService: TokenService,
    private readonly emailService: EmailService,
    private readonly prismaService: PrismaService,
  ) {}

  private async generateTokensAndStoreRefresh(
    userId: number,
    username: string,
  ) {
    const payload = { sub: userId, username }

    const accessToken = await this.tokenService.generateAccessToken(payload)
    const refreshToken = await this.tokenService.generateRefreshToken(payload)

    const hashedRefreshToken = await this.passwordService.hashPassword(
      refreshToken,
    )

    await this.userService.updateRefreshToken(userId, hashedRefreshToken)

    return {
      accessToken,
      refreshToken,
    }
  }

  async validateUser(loginData: LoginDto) {
    const { identifier, password } = loginData
    const user = isEmail(identifier)
      ? await this.userService.findByEmail(identifier)
      : await this.userService.findByUsername(identifier)

    if (!user) {
      throw new UnauthorizedException('User not found')
    }

    const isValidPassword = await this.passwordService.comparePassword(
      password,
      user.password,
    )

    if (!isValidPassword) {
      throw new UnauthorizedException('Invalid password')
    }

    return { userId: user.id, username: user.username, email: user.email }
  }

  async signIn(loginDto: LoginDto) {
    const { userId, username, email } = await this.validateUser(loginDto)

    const tokens = await this.generateTokensAndStoreRefresh(userId, username)

    return {
      ...tokens,
      user: {
        userId,
        username,
        email,
      },
    }
  }

  async refresh(userId: number, refreshToken: string) {
    const user = await this.userService.findById(userId)

    if (!user || !user.currentHashedRefreshToken) {
      throw new UnauthorizedException('Access denied')
    }

    const isMatch = await this.passwordService.comparePassword(
      refreshToken,
      user.currentHashedRefreshToken,
    )

    if (!isMatch) {
      throw new UnauthorizedException('Refresh token invalid')
    }

    const tokens = await this.generateTokensAndStoreRefresh(
      userId,
      user.username,
    )

    return tokens
  }

  async logout(userId: number) {
    await this.userService.updateRefreshToken(userId, null)
  }

  async requestPasswordReset(dto: RequestPasswordResetDto) {
    const user = await this.userService.findByEmail(dto.email)
    if (!user) {
      throw new BadRequestException('User not found')
    }

    const token = await this.userService.setPasswordResetToken(dto.email)

    await this.emailService.sendPasswordResetEmail(dto.email, token)

    return { message: 'Email z instrukcjami resetowania hasła został wysłany' }
  }

  async resetPassword(dto: ResetPasswordDto) {
    const success = await this.userService.resetPassword(
      dto.token,
      dto.newPassword,
    )
    if (!success) {
      throw new BadRequestException('Invalid or expired password reset token')
    }
    return { message: 'Password reset successfully' }
  }
}
