import { IsOptional, IsString } from 'class-validator'

export class FindByDto {
  @IsOptional()
  @IsString()
  id?: string

  @IsOptional()
  @IsString()
  email?: string

  @IsOptional()
  @IsString()
  username?: string
}
