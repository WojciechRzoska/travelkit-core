import { AuthenticationController } from '@modules/authentication/authentication.controller'
import { AuthenticationService } from '@modules/authentication/authentication.service'
import { LocalStrategy } from '@modules/authentication/strategies/local.strategy'
import { UserModule } from '@modules/user/user.module'
import { Module } from '@nestjs/common'
import { ConfigModule, ConfigService } from '@nestjs/config'
import { JwtModule } from '@nestjs/jwt'
import { PassportModule } from '@nestjs/passport'
import { PasswordModule } from '@shared/modules/password/password.module'

@Module({
  imports: [
    ConfigModule,
    UserModule,
    PasswordModule,
    JwtModule.registerAsync({
      global: true,
      useFactory: async (configService: ConfigService) => ({
        secret: configService.get<string>('JWT_SECRET_KEY'),
        signOptions: { expiresIn: '1d' },
      }),
      inject: [ConfigService],
    }),
    PassportModule,
  ],
  controllers: [AuthenticationController],
  providers: [AuthenticationService, LocalStrategy],
})
export class AuthenticationModule {}
