import { IsDateString, IsInt, IsString } from 'class-validator'

export class CreateTripDto {
  @IsString()
  name: string

  @IsDateString()
  startDate: string

  @IsDateString()
  endsDate: string

  @IsInt()
  userId: number

  // TODO add trip members
}
