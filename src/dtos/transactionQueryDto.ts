import { IsIn, IsInt, IsNumber, IsOptional, IsString } from 'class-validator';
import { Transform, Type } from 'class-transformer';
import { QueryDto } from './queryDto';

export class TransactionQueryDto extends QueryDto {
  @IsIn(['id', 'value', 'description', 'date'])
  @IsString()
  @IsOptional()
  @Transform(({ value }) => (value ? value.toLowerCase() : value))
  public sortBy: 'id' | 'value' | 'description' | 'date' = 'id';

  @IsNumber()
  @IsOptional()
  @Type(() => Number)
  public minValue?: number;

  @IsNumber()
  @IsOptional()
  @Type(() => Number)
  public maxValue?: number;

  @IsString()
  @IsOptional()
  public description: string = '';

  @IsOptional()
  @Type(() => Date)
  public initialDate?: Date;

  @IsOptional()
  @Type(() => Date)
  public finalDate?: Date;

  @IsInt()
  @IsOptional()
  @Type(() => Number)
  public categoryId?: number;
}
