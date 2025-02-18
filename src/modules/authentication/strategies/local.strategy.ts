import { AuthenticationService } from '@modules/authentication/authentication.service'
import { UserService } from '@modules/user/user.service'
import { Injectable, UnauthorizedException } from '@nestjs/common'
import { PassportStrategy } from '@nestjs/passport'
import { PasswordService } from '@shared/modules/password/password.service'
import { Strategy } from 'passport-local'

@Injectable()
export class LocalStrategy extends PassportStrategy(Strategy) {
  constructor(
    private authService: AuthenticationService,
    private readonly userService: UserService,
    private readonly passwordService: PasswordService,
  ) {
    super({
      usernameField: 'identifier',
    })
  }
  async validate(identifier: string, password: string) {
    const loginData = { identifier, password }
    const user = await this.authService.validateUser(loginData)

    if (!user) {
      throw new UnauthorizedException('Invalid credentials')
    }

    return user
  }
}
