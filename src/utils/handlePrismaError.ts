import {
  BadRequestException,
  ConflictException,
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common'
import { PrismaClientKnownRequestError } from '@prisma/client/runtime/library'

const handlePrismaError = (error: unknown) => {
  if (error instanceof PrismaClientKnownRequestError) {
    switch (error.code) {
      case 'P2002':
        return new ConflictException(
          `User with this ${error.meta?.target} already exists`,
        )
      case 'P2003':
        return new BadRequestException('Invalid foreign key reference')
      case 'P2025':
        return new NotFoundException('Record not found')
      default:
        return new InternalServerErrorException('Database error')
    }
  }
  return error
}

export default handlePrismaError
