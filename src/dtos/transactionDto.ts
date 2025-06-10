import {
  IsDateString,
  IsInt,
  IsNotEmpty,
  IsNumber,
  Max,
  MaxLength,
  Min
} from 'class-validator';

export class TransactionDto {
  @Max(100000)
  @Min(-100000)
  @IsNumber({ maxDecimalPlaces: 2 })
  @IsNotEmpty()
  public value: number;

  @MaxLength(100)
  @IsNotEmpty()
  public description: string;

  @IsDateString()
  @IsNotEmpty()
  public date: string;

  @IsInt()
  @IsNotEmpty()
  public category_id: number;
}
