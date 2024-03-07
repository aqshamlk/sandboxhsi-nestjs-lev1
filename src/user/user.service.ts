import {
  Injectable,
  ForbiddenException,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from './entities/user.entity';
import { CreateUserDto, UpdateUserDto } from './dto';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
  ) {}

  async findAll() {
    return await this.userRepository.find();
  }

  async findOne(id: number) {
    const user = await this.userRepository.findOne({ where: { id: id } });
    if (!user) {
      throw new NotFoundException('User tidak ditemukan');
    }
    return user;
  }

  async create(createUserDto: CreateUserDto) {
    const isNewUser = await this.userRepository.findOne({
      where: { email: createUserDto.email },
    });
    if (isNewUser) {
      throw new ForbiddenException('Email sudah digunakan');
    }
    const newUser = this.userRepository.create(createUserDto);
    return await this.userRepository.save(newUser);
  }

  async update(id: number, updateUserDto: UpdateUserDto) {
    const user = await this.userRepository.findOne({ where: { id: id } });
    if (!user) {
      throw new ForbiddenException('User tidak ditemukan');
    }
    if (updateUserDto.email) {
      const isEmailExist = await this.userRepository.findOne({
        where: { email: updateUserDto.email },
      });
      if (isEmailExist && isEmailExist.id !== id) {
        throw new ForbiddenException('Email sudah digunakan');
      }
    }
    await this.userRepository.update(id, updateUserDto);
    return await this.userRepository.findOne({ where: { id: id } });
  }

  async remove(id: number) {
    const user = await this.userRepository.findOne({ where: { id: id } });
    if (!user) {
      throw new ForbiddenException('User tidak ditemukan');
    }
    return await this.userRepository.delete(id);
  }
}
