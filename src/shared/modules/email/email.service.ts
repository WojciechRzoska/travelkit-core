import { Injectable } from '@nestjs/common'
import { ConfigService } from '@nestjs/config'
import { Resend } from 'resend'
import PasswordResetEmail from './templates/react/PasswordResetEmail'
import { VerificationEmail } from './templates/react/VerificationEmail'
import WelcomeEmail from './templates/react/WelcomeEmail'

@Injectable()
export class EmailService {
  private resend: Resend

  constructor(private readonly configService: ConfigService) {
    this.resend = new Resend(this.configService.get<string>('RESEND_API_KEY'))
  }

  async sendPasswordResetEmail(email: string, token: string) {
    const resetUrl = `travelkit://reset-password?token=${token}`

    await this.resend.emails.send({
      from:
        this.configService.get<string>('EMAIL_FROM') || 'onboarding@resend.dev',
      to: email,
      subject: 'Reset hasła - TravelKit',
      react: PasswordResetEmail({
        name: email.split('@')[0],
        resetUrl,
      }),
    })
  }

  async sendWelcomeEmail(email: string) {
    await this.resend.emails.send({
      from:
        this.configService.get<string>('EMAIL_FROM') || 'onboarding@resend.dev',
      to: email,
      subject: 'Witaj w TravelKit! 🎉',
      react: WelcomeEmail({
        name: email.split('@')[0],
      }),
    })
  }

  async sendVerificationEmail(email: string, token: string) {
    const verificationUrl = `${process.env.FRONTEND_URL}/verify-email?token=${token}`

    await this.resend.emails.send({
      from: 'TravelKit <noreply@travelkit.app>',
      to: email,
      subject: 'Weryfikacja adresu email',
      react: VerificationEmail({ verificationUrl }),
    })

    console.log('Verification email sent to', email)
  }
}
