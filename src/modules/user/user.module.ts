import { Module } from '@nestjs/common'
import { DatabaseModule } from '@shared/modules/database/database.module'
import { EmailModule } from '@shared/modules/email/email.module'
import { PasswordService } from '@shared/modules/password/password.service'
import { TokenModule } from '@shared/modules/token/token.module'
import { EmailVerificationService } from './email-verification.service'
import { UserController } from './user.controller'
import { UserService } from './user.service'

@Module({
  imports: [EmailModule, DatabaseModule, TokenModule],
  controllers: [UserController],
  providers: [UserService, PasswordService, EmailVerificationService],
  exports: [UserService, EmailVerificationService],
})
export class UserModule {}
