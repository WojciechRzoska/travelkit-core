import { Module } from '@nestjs/common'
import { JwtService } from '@nestjs/jwt'
import { EmailModule } from '@shared/modules/email/email.module'
import { PasswordService } from '@shared/modules/password/password.service'
import { UserController } from './user.controller'
import { UserService } from './user.service'

@Module({
  imports: [EmailModule],
  controllers: [UserController],
  providers: [UserService, PasswordService, JwtService],
  exports: [UserService],
})
export class UserModule {}
