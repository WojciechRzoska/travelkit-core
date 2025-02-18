import {
  IsEmail,
  IsNotEmpty,
  IsString,
  IsStrongPassword,
  MinLength,
} from 'class-validator'

export class CreateUserDto {
  @IsString()
  @MinLength(3)
  username: string

  @IsEmail()
  @IsNotEmpty()
  email: string

  @IsStrongPassword({ minLength: 8, minUppercase: 1 })
  password: string

  @IsString()
  firstName: string

  @IsString()
  lastName: string
}
