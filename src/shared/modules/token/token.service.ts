import { Injectable } from '@nestjs/common'
import { JwtService } from '@nestjs/jwt'

export interface TokenPayload {
  sub: number
  username: string
  email?: string
  role?: string
}

@Injectable()
export class TokenService {
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
