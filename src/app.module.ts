import { TripModule } from '@modules/trip/trip.module'
import { Module } from '@nestjs/common'
import { ConfigModule } from '@nestjs/config'
import { PasswordModule } from '@shared/modules/password/password.module'
import { TokenModule } from '@shared/modules/token/token.module'
import { UserModule } from 'src/modules/user/user.module'
import { DatabaseModule } from 'src/shared/modules/database/database.module'
import { EmailModule } from 'src/shared/modules/email/email.module'
import { AuthenticationModule } from './modules/authentication/authentication.module'

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true, envFilePath: '.env' }),
    DatabaseModule,
    UserModule,
    AuthenticationModule,
    PasswordModule,
    TripModule,
    EmailModule,
    TokenModule,
  ],
})
export class AppModule {}
