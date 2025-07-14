import { IsOptional } from 'class-validator';
import { TransactionDto } from './transactionDto';

export class TransactionUpdateDto extends TransactionDto {
  @IsOptional()
  public value: number;

  @IsOptional()
  public description: string;

  @IsOptional()
  public date: string;

  @IsOptional()
  public category_id: number;
}
