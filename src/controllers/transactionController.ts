/* eslint-disable @typescript-eslint/no-unused-vars */

import { NextFunction, Request, RequestHandler, Response } from 'express';
import { FindManyOptions, Like } from 'typeorm';
import { plainToInstance } from 'class-transformer';
import { AppDataSource } from '../data-source';
import { Transaction } from '../entities/Transaction';
import { Category } from '../entities/Category';
import { TransactionDto } from '../dtos/transactionDto';
import { TransactionQueryDto } from '../dtos/transactionQueryDto';
import { TransactionUpdateDto } from 'src/dtos/transactionUpdateDto';
import { validateData } from '../helpers/validateData';
import { getOneAndValidate } from '../helpers/getOneAndValidate';
import { getRangeFilter } from '../helpers/getRangeFilter';

export class TransactionController {
  private static readonly transactionRepository =
    AppDataSource.getRepository(Transaction);

  private static readonly categoryRepository =
    AppDataSource.getRepository(Category);

  public static getAll: RequestHandler = async (
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> => {
    const queryDto = plainToInstance(TransactionQueryDto, req.query);

    await validateData(queryDto);

    const {
      limit,
      page,
      sortBy,
      order,
      description,
      categoryId,
      minValue,
      maxValue,
      initialDate,
      finalDate
    } = queryDto;
    const [transactions, total] = await this.transactionRepository.findAndCount(
      {
        skip: (page - 1) * limit,
        take: limit,
        order: { [sortBy]: order },
        where: {
          description: Like(`%${description}%`),
          category: { id: categoryId },
          value: getRangeFilter(minValue, maxValue),
          date: getRangeFilter(initialDate, finalDate)
        }
      } as FindManyOptions<Transaction>
    );
    const totalPages = Math.ceil(total / limit);

    res.status(200).json({
      success: true,
      meta: { total, limit, page, totalPages, sortBy, order },
      data: transactions
    });
  };

  public static getOne: RequestHandler = async (
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> => {
    const { id } = req.params;
    const transaction = await getOneAndValidate(
      this.transactionRepository,
      Number(id)
    );

    res.status(200).json({ success: true, data: transaction });
  };

  public static create: RequestHandler = async (
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> => {
    const transactionDto = plainToInstance(TransactionDto, req.body);

    await validateData(transactionDto);

    const category = await getOneAndValidate(
      this.categoryRepository,
      transactionDto.category_id
    );
    const transaction = this.transactionRepository.create(transactionDto);

    transaction.category = category as Category;

    await this.transactionRepository.save(transaction);

    res.status(201).json({
      success: true,
      message: 'Transaction created successfully',
      data: transaction
    });
  };

  public static update: RequestHandler = async (
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> => {
    const { id } = req.params;
    const transactionDto = plainToInstance(TransactionUpdateDto, req.body);

    await validateData(transactionDto);

    const transaction = await getOneAndValidate(
      this.transactionRepository,
      Number(id)
    );

    if (transactionDto.category_id) {
      const category = await getOneAndValidate(
        this.categoryRepository,
        transactionDto.category_id
      );

      transaction.category = category;
    }

    this.transactionRepository.merge(
      transaction as Transaction,
      transactionDto
    );

    await this.transactionRepository.save(transaction);

    res.status(200).json({
      success: true,
      message: 'Transaction updated successfully',
      data: transaction
    });
  };

  public static remove: RequestHandler = async (
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> => {
    const { id } = req.params;
    const transaction = await getOneAndValidate(
      this.transactionRepository,
      Number(id)
    );

    await this.transactionRepository.remove(transaction as Transaction);

    res.status(200).json({
      success: true,
      message: 'Category removed successfully'
    });
  };
}
