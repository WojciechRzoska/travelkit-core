export type TokenPayload = {
  sub: number
  email?: string
  username?: string
}

export type ITokenService = {
  generateVerificationToken(email: string): Promise<string>
  verifyToken(token: string): Promise<TokenPayload>
  generateAccessToken(payload: TokenPayload): Promise<string>
  generateRefreshToken(payload: TokenPayload): Promise<string>
}
