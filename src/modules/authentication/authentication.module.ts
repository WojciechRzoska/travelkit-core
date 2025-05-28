import { AuthenticationController } from '@modules/authentication/authentication.controller'
import { AuthenticationService } from '@modules/authentication/authentication.service'
import { LocalStrategy } from '@modules/authentication/strategies/local.strategy'
import { UserModule } from '@modules/user/user.module'
import { Module } from '@nestjs/common'
import { ConfigModule } from '@nestjs/config'
import { PassportModule } from '@nestjs/passport'
import { EmailModule } from '@shared/modules/email/email.module'
import { PasswordModule } from '@shared/modules/password/password.module'
import { TokenModule } from '@shared/modules/token/token.module'

@Module({
  imports: [
    ConfigModule,
    UserModule,
    PasswordModule,
    PassportModule,
    EmailModule,
    TokenModule,
  ],
  controllers: [AuthenticationController],
  providers: [AuthenticationService, LocalStrategy],
  exports: [AuthenticationService],
})
export class AuthenticationModule {}
