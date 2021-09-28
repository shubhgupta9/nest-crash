import {
  Controller,
  Get,
  Param,
  Post,
  Body,
  NotFoundException,
  BadRequestException,
  ParseIntPipe,
} from '@nestjs/common';
import { UsersService } from './users.service';
import { createUserDto } from 'src/users/dto/create-users.dto';
import { User } from './entities/user.entity';
// import { ApiTags } from '@nestjs/swagger';
import { Query } from '@nestjs/common';
import {
  ApiCreatedResponse,
  ApiNotFoundResponse,
  ApiOkResponse,
} from '@nestjs/swagger';

// @ApiTags('users')
@Controller('users')
export class UsersController {
  constructor(private usersService: UsersService) {}
  @Get()
  getUsers(@Query('name') name: string): User[] {
    return this.usersService.findAll(name);
  }

  @ApiOkResponse({ type: User, description: 'the user' })
  @ApiNotFoundResponse()
  @Get(':id')
  getUserById(@Param('id', ParseIntPipe) id: number): User {
    const user = this.usersService.findById(id);

    if (!user) {
      throw new BadRequestException();
    }

    return user;
  }

  @ApiCreatedResponse({ type: User })
  @Post()
  createUser(@Body() body: createUserDto): User {
    return this.usersService.createUser(body);
  }
}
