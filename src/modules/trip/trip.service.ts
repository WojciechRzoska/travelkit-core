import { Injectable } from '@nestjs/common'
import { PrismaService } from '@shared/modules/database/prisma.service'
import { CreateTripDto } from './dto/create-trip.dto'
import { UpdateTripDto } from './dto/update-trip.dto'

@Injectable()
export class TripService {
  constructor(private readonly prismaService: PrismaService) {}

  create(createTripDto: CreateTripDto) {
    return this.prismaService.trip.create({ data: createTripDto })
  }

  findAll() {
    return this.prismaService.trip.findMany()
  }

  findAllByUserId(id: number) {
    return this.prismaService.trip.findMany({ where: { userId: id } })
  }

  findOne(id: number) {
    return this.prismaService.trip.findUnique({ where: { id } })
  }

  update(id: number, updateTripDto: UpdateTripDto) {
    return this.prismaService.trip.update({
      where: { id },
      data: updateTripDto,
    })
  }

  remove(id: number) {
    return this.prismaService.trip.delete({ where: { id } })
  }
}
