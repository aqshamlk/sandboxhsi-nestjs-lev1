import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Delete,
  HttpCode,
  Put,
} from '@nestjs/common';
import { UserService } from './user.service';
import {
  CreateUserDto,
  UpdateUserDto,
  DeleteUserDto,
  CreateBulkUserDto,
} from './dto';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @HttpCode(201)
  @Post('create')
  create(@Body() createUserDto: CreateUserDto) {
    return this.userService.create(createUserDto);
  }

  @Post('create/bulk')
  async createBulk(@Body() createUserDto: CreateBulkUserDto) {
    const data = [];
    for (let i = 0; i < createUserDto.data.length; i++) {
      try {
        data.push(await this.userService.create(createUserDto.data[i]));
      } catch (error) {
        data.push({
          error: error.message,
          data: createUserDto.data[i],
        });
      }
    }
    const created = data.filter((item) => !item.error);
    const failed = data.filter((item) => item.error);
    return {
      message: `${created.length} created and ${failed.length} failed`,
      created: created,
      failed: failed,
    };
  }

  @Get('list')
  findAll() {
    return this.userService.findAll();
  }

  @Get('detail/:id')
  findOne(@Param('id') id: string) {
    return this.userService.findOne(+id);
  }

  @Put('update/:id')
  update(@Param('id') id: string, @Body() updateUserDto: UpdateUserDto) {
    return this.userService.update(+id, updateUserDto);
  }

  @Delete('delete/:id')
  remove(@Param('id') id: string) {
    return this.userService.remove(+id);
  }

  @Post('delete/bulk')
  async removeBulk(@Body() deleteUserDto: DeleteUserDto) {
    const removed: number[] = [];
    const fail: number[] = [];
    for (let i = 0; i < deleteUserDto.delete.length; i++) {
      try {
        await this.userService.remove(deleteUserDto.delete[i]);
        removed.push(deleteUserDto.delete[i]);
      } catch (error) {
        fail.push(deleteUserDto.delete[i]);
      }
    }
    return {
      message: `${removed.length} removed, ${fail.length} failed`,
      removed,
      fail,
    };
  }
}
