import {
  IsEmail,
  IsIn,
  IsNotEmpty,
  IsString,
  IsInt,
  Max,
  Min,
  IsDateString,
} from 'class-validator';

export class CreateUserDto {
  @IsString()
  @IsNotEmpty()
  nama: string;

  @IsEmail()
  @IsNotEmpty()
  email: string;

  @IsNotEmpty()
  @IsInt()
  @Min(20)
  @Max(40)
  umur: number;

  @IsNotEmpty()
  @IsDateString()
  tanggal_lahir: Date;

  @IsNotEmpty()
  @IsIn(['admin', 'siswa', 'guru'])
  role: string;
}
