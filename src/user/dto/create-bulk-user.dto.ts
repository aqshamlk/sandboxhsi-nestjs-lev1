import { IsArray, ArrayMinSize, ValidateNested } from 'class-validator';
import { CreateUserDto } from './create-user.dto';
import { Type } from 'class-transformer';

export class CreateBulkUserDto {
  @IsArray()
  @ArrayMinSize(1)
  @Type(() => CreateUserDto)
  @ValidateNested({ each: true })
  data: CreateUserDto[];
}
