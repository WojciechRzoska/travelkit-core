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

    return { userId: user.id, username: user.username }
  }

  async signIn(loginDto: LoginDto) {
    const accessToken = await this.jwtService.signAsync({ ...loginDto })

    return { ...loginDto, accessToken }
  }
}
