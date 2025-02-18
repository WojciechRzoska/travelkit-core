import { Module } from '@nestjs/common'

import { ConfigModule } from '@nestjs/config'

import { PasswordModule } from '@shared/modules/password/password.module'
import { UserModule } from 'src/modules/user/user.module'
import { DatabaseModule } from 'src/shared/modules/database/database.module'
import { AuthenticationController } from './modules/authentication/authentication.controller'
import { AuthenticationModule } from './modules/authentication/authentication.module'
import { AuthenticationService } from './modules/authentication/authentication.service'

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true, envFilePath: '.env' }),
    DatabaseModule,
    UserModule,
    AuthenticationModule,
    PasswordModule,
  ],
  controllers: [AuthenticationController],
  providers: [AuthenticationService],
})
export class AppModule {}
