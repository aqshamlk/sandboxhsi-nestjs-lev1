import {
  IsDateString,
  IsEmail,
  IsIn,
  IsInt,
  IsOptional,
  IsString,
  Max,
  Min,
} from 'class-validator';

export class UpdateUserDto {
  @IsString()
  @IsOptional()
  nama?: string;

  @IsEmail()
  @IsOptional()
  email?: string;

  @IsOptional()
  @IsInt()
  @Max(40)
  @Min(20)
  umur?: number;

  @IsOptional()
  @IsDateString()
  tanggal_lahir?: Date;

  @IsOptional()
  @IsIn(['admin', 'siswa', 'guru'])
  role?: string;
}
