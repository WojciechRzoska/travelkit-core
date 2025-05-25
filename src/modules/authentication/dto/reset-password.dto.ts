import { IsString, IsStrongPassword } from 'class-validator'

export class ResetPasswordDto {
  @IsString()
  token: string

  @IsStrongPassword({ minLength: 8, minUppercase: 1 })
  newPassword: string
}
