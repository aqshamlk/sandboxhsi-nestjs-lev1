import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  nama: string;

  @Column({ unique: true })
  email: string;

  @Column()
  umur: number;

  @Column()
  tanggal_lahir: Date;

  @Column()
  role: string;
}
