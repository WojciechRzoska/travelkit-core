import { Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { PrismaService } from 'src/shared/modules/database/prisma.service';
import { PasswordService } from 'src/shared/modules/password/password.service';

@Injectable()
export class UserService {
  constructor(
    private readonly prismaService: PrismaService,
    private readonly passwordService: PasswordService,
  ) {}

  async create(createUserDto: CreateUserDto) {
    const { password, ...restCreateUserDto } = createUserDto;
    const hashedPassword = await this.passwordService.hashPassword(password);

    return this.prismaService.user.create({
      data: { password: hashedPassword, ...restCreateUserDto },
    });
  }

  findAll() {
    return this.prismaService.user.findMany();
  }

  findOne(id: number) {
    return this.prismaService.user.findUnique({ where: { id } });
  }

  update(id: number, updateUserDto: UpdateUserDto) {
    return this.prismaService.user.update({
      where: { id },
      data: updateUserDto,
    });
  }

  remove(id: number) {
    return this.prismaService.user.delete({ where: { id } });
  }
}
