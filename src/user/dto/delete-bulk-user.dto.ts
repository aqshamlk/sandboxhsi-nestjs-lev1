import { ArrayMinSize, IsArray, IsNotEmpty, IsNumber } from 'class-validator';

export class DeleteUserDto {
  @IsArray()
  @IsNotEmpty()
  @ArrayMinSize(1)
  @IsNumber({}, { each: true })
  delete: number[];
}
