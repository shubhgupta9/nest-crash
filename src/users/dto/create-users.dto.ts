import { IsAlphanumeric, MaxLength } from 'class-validator';

export class createUserDto {
  @IsAlphanumeric()
  @MaxLength(10)
  name: string;
}
