import { AuthenticationService } from '@modules/authentication/authentication.service'
import { LoginDto } from '@modules/authentication/dto/login.dto'
import { RefreshDto } from '@modules/authentication/dto/refresh.dto'
import { PassportLocalGuard } from '@modules/authentication/guards/passportLocal.guard'
import {
  Body,
  Controller,
  HttpCode,
  HttpStatus,
  Post,
  UseGuards,
} from '@nestjs/common'
import { AuthGuard } from '@shared/guards/auth.guard'

@Controller('auth')
export class AuthenticationController {
  constructor(private readonly authService: AuthenticationService) {}

  @HttpCode(HttpStatus.OK)
  @Post('login')
  @UseGuards(PassportLocalGuard)
  login(@Body() loginDto: LoginDto) {
    return this.authService.signIn(loginDto)
  }

  @HttpCode(HttpStatus.OK)
  @Post('logout')
  @UseGuards(AuthGuard)
  logout(@Body('userId') userId: number) {
    return this.authService.logout(userId)
  }

  @HttpCode(HttpStatus.OK)
  @Post('refresh')
  @UseGuards(AuthGuard)
  refresh(@Body() { userId, refreshToken }: RefreshDto) {
    return this.authService.refresh(userId, refreshToken)
  }
}
