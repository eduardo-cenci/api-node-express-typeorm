import {
  IsIn,
  IsNumber,
  IsOptional,
  IsString,
  Max,
  Min
} from 'class-validator';
import { Transform, Type } from 'class-transformer';

export abstract class QueryDto {
  @Max(100)
  @Min(1)
  @IsNumber()
  @IsOptional()
  @Type(() => Number)
  public limit: number = 10;

  @Min(1)
  @IsNumber()
  @IsOptional()
  @Type(() => Number)
  public page: number = 1;

  @IsIn(['ASC', 'DESC'])
  @IsString()
  @IsOptional()
  @Transform(({ value }) => (value ? value.toUpperCase() : value))
  public order: 'ASC' | 'DESC' = 'ASC';

  public abstract sortBy?: string;
}
