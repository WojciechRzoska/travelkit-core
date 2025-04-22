import { LoginDto } from '@modules/authentication/dto/login.dto'
import { UserService } from '@modules/user/user.service'
import { Injectable, UnauthorizedException } from '@nestjs/common'
import { JwtService } from '@nestjs/jwt'

import { PasswordService } from '@shared/modules/password/password.service'
import { isEmail } from 'class-validator'

@Injectable()
export class AuthenticationService {
  constructor(
    private readonly userService: UserService,
    private readonly passwordService: PasswordService,
    private readonly jwtService: JwtService,
  ) {}
  private async generateTokensAndStoreRefresh(
    userId: number,
    username: string,
  ) {
    const payload = { sub: userId, username }

    const accessToken = await this.jwtService.signAsync(payload, {
      expiresIn: '1d',
    })

    const refreshToken = await this.jwtService.signAsync(payload, {
      expiresIn: '7d',
    })

    const hashedRefreshToken = await this.passwordService.hashPassword(
      refreshToken,
    )

    await this.userService.update(userId, {
      currentHashedRefreshToken: hashedRefreshToken,
    })

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
    await this.userService.update(userId, {
      currentHashedRefreshToken: null,
    })
  }
}
