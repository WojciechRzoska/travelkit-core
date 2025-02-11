import { Module } from '@nestjs/common'

import { UserModule } from 'src/modules/user/user.module'
import { DatabaseModule } from 'src/shared/modules/database/database.module'

@Module({
  imports: [DatabaseModule, UserModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
