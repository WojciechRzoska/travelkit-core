import { FindByDto } from '@modules/user/dto/find-by.dto'
import {
  BadRequestException,
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  HttpStatus,
  Param,
  Patch,
  Post,
  Query,
} from '@nestjs/common'
import { CreateUserDto } from './dto/create-user.dto'
import { UpdateUserDto } from './dto/update-user.dto'
import { UserService } from './user.service'

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @HttpCode(HttpStatus.CREATED)
  @Post()
  create(@Body() createUserDto: CreateUserDto) {
    this.userService.create(createUserDto)
    return
  }

  @HttpCode(HttpStatus.OK)
  @Get()
  findAll() {
    return this.userService.findAll()
  }

  @HttpCode(HttpStatus.OK)
  @Get('/find-by')
  findBy(@Query() query: FindByDto) {
    const { id, email, username } = query

    if (id) return this.userService.findById(+id)
    if (email) return this.userService.findByEmail(email)
    if (username) return this.userService.findByUsername(username)

    throw new BadRequestException('At least one query parameter is required')
  }

  @HttpCode(HttpStatus.NO_CONTENT)
  @Patch(':id')
  update(@Param('id') id: string, @Body() updateUserDto: UpdateUserDto) {
    return this.userService.update(+id, updateUserDto)
  }

  @HttpCode(HttpStatus.NO_CONTENT)
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.userService.remove(+id)
  }
}
