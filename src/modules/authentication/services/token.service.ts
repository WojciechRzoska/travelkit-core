import { Injectable } from '@nestjs/common'
import { JwtService } from '@nestjs/jwt'
import { ITokenService, TokenPayload } from '../interfaces/token.interface'

@Injectable()
export class TokenService implements ITokenService {
  constructor(private readonly jwtService: JwtService) {}

  async generateVerificationToken(email: string): Promise<string> {
    return this.jwtService.signAsync({ email }, { expiresIn: '24h' })
  }

  async verifyToken(token: string): Promise<TokenPayload> {
    return this.jwtService.verifyAsync(token)
  }

  async generateAccessToken(payload: TokenPayload): Promise<string> {
    return this.jwtService.signAsync(payload, { expiresIn: '1d' })
  }

  async generateRefreshToken(payload: TokenPayload): Promise<string> {
    return this.jwtService.signAsync(payload, { expiresIn: '7d' })
  }
}
