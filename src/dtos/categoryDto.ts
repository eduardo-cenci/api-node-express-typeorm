import { IsNotEmpty, MaxLength } from 'class-validator';

export class CategoryDto {
  @MaxLength(100)
  @IsNotEmpty()
  public description: string;
}
