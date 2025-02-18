import { AuthenticationService } from '@modules/authentication/authentication.service'
import { LoginDto } from '@modules/authentication/dto/login.dto'
import { PassportLocalGuard } from '@modules/authentication/guards/passportLocal.guard'
import {
  Body,
  Controller,
  HttpCode,
  HttpStatus,
  Post,
  UseGuards,
} from '@nestjs/common'

@Controller('authentication')
export class AuthenticationController {
  constructor(private readonly authService: AuthenticationService) {}

  @HttpCode(HttpStatus.OK)
  @Post('login')
  @UseGuards(PassportLocalGuard)
  login(@Body() loginDto: LoginDto) {
    return this.authService.signIn(loginDto)
  }
}
