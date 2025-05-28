import { Injectable } from '@nestjs/common'
import { PrismaService } from '@shared/modules/database/prisma.service'
import { TokenService } from '@shared/modules/token/token.service'

@Injectable()
export class EmailVerificationService {
  constructor(
    private readonly prismaService: PrismaService,
    private readonly tokenService: TokenService,
  ) {}

  async verifyEmail(token: string): Promise<boolean> {
    try {
      const payload = await this.tokenService.verifyToken(token)
      const verificationToken =
        await this.prismaService.emailVerificationToken.findFirst({
          where: {
            token,
            expiresAt: { gt: new Date() },
            isUsed: false,
          },
          include: { user: true },
        })

      if (
        !verificationToken ||
        verificationToken.user.email !== payload.email
      ) {
        return false
      }

      await this.prismaService.$transaction([
        this.prismaService.user.update({
          where: { id: verificationToken.userId },
          data: { isActive: true },
        }),
        this.prismaService.emailVerificationToken.update({
          where: { id: verificationToken.id },
          data: { isUsed: true },
        }),
      ])

      return true
    } catch {
      return false
    }
  }
}
