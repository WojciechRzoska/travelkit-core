import { Module } from '@nestjs/common'
import { PasswordService } from '@shared/modules/password/password.service'
import { UserController } from './user.controller'
import { UserService } from './user.service'

@Module({
  controllers: [UserController],
  providers: [UserService, PasswordService],
  exports: [UserService],
})
export class UserModule {}
