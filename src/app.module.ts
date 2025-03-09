import { Module } from '@nestjs/common'

import { ConfigModule } from '@nestjs/config'

import { PasswordModule } from '@shared/modules/password/password.module'
import { UserModule } from 'src/modules/user/user.module'
import { DatabaseModule } from 'src/shared/modules/database/database.module'

import { TripModule } from '@modules/trip/trip.module'
import { AuthenticationController } from './modules/authentication/authentication.controller'
import { AuthenticationModule } from './modules/authentication/authentication.module'
import { AuthenticationService } from './modules/authentication/authentication.service'
import { LocationModule } from './module/location/location.module'
import { LocationModule } from './modules/location/location.module'

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true, envFilePath: '.env' }),
    DatabaseModule,
    UserModule,
    AuthenticationModule,
    PasswordModule,
    TripModule,
    LocationModule,
  ],
  controllers: [AuthenticationController],
  providers: [AuthenticationService],
})
export class AppModule {}
