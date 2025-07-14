import { IsOptional } from 'class-validator';
import { CategoryDto } from './categoryDto';

export class CategoryUpdateDto extends CategoryDto {
  @IsOptional()
  public description: string;
}
