import { IsIn, IsOptional, IsString } from 'class-validator';
import { Transform } from 'class-transformer';
import { QueryDto } from './queryDto';

export class CategoryQueryDto extends QueryDto {
  @IsIn(['id', 'description'])
  @IsString()
  @IsOptional()
  @Transform(({ value }) => (value ? value.toLowerCase() : value))
  public sortBy: 'id' | 'description' = 'id';

  @IsString()
  @IsOptional()
  public description: string = '';
}
