import {
  ExecutionContext,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common'
import { JwtService } from '@nestjs/jwt'

@Injectable()
export class AuthGuard {
  constructor(private readonly jwtServie: JwtService) {}

  async canActivate(context: ExecutionContext) {
    const request = context.switchToHttp().getRequest()
    const authorization = request.headers.authorization
    const token = authorization?.split(' ')[1]

    if (!token) {
      throw new UnauthorizedException('Token not found')
    }

    try {
      const tokenPayload = await this.jwtServie.verifyAsync(token)
      request.user = {
        userId: tokenPayload.userId,
      }
      return true
    } catch {
      throw new UnauthorizedException('Invalid token')
    }
  }
}
