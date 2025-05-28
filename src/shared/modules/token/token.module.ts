import { Module } from '@nestjs/common'
import { ConfigModule, ConfigService } from '@nestjs/config'
import { JwtModule } from '@nestjs/jwt'
import { TokenService } from './token.service'

@Module({
  imports: [
    ConfigModule,
    JwtModule.registerAsync({
      global: true,
      useFactory: async (configService: ConfigService) => ({
        secret: configService.get<string>('JWT_SECRET_KEY'),
        signOptions: { expiresIn: '1d' },
      }),
      inject: [ConfigService],
    }),
  ],
  providers: [TokenService],
  exports: [TokenService],
})
export class TokenModule {}
