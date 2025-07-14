/* eslint-disable @typescript-eslint/no-unused-vars */

import { NextFunction, Request, RequestHandler, Response } from 'express';
import { FindManyOptions, Like } from 'typeorm';
import { plainToInstance } from 'class-transformer';
import { AppDataSource } from '../data-source';
import { Category } from '../entities/Category';
import { CategoryDto } from '../dtos/categoryDto';
import { CategoryQueryDto } from '../dtos/categoryQueryDto';
import { CategoryUpdateDto } from 'src/dtos/categoryUpdateDto';
import { validateData } from '../helpers/validateData';
import { getOneAndValidate } from '../helpers/getOneAndValidate';

export class CategoryController {
  private static readonly categoryRepository =
    AppDataSource.getRepository(Category);

  public static getAll: RequestHandler = async (
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> => {
    const queryDto = plainToInstance(CategoryQueryDto, req.query);

    await validateData(queryDto);

    const { limit, page, sortBy, order, description } = queryDto;
    const [categories, total] = await this.categoryRepository.findAndCount({
      skip: (page - 1) * limit,
      take: limit,
      order: { [sortBy]: order },
      where: { description: Like(`%${description}%`) }
    } as FindManyOptions<Category>);
    const totalPages = Math.ceil(total / limit);

    res.status(200).json({
      success: true,
      meta: { total, limit, page, totalPages, sortBy, order },
      data: categories
    });
  };

  public static getOne: RequestHandler = async (
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> => {
    const { id } = req.params;
    const category = await getOneAndValidate(
      this.categoryRepository,
      Number(id)
    );

    res.status(200).json({ success: true, data: category });
  };

  public static create: RequestHandler = async (
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> => {
    const categoryDto = plainToInstance(CategoryDto, req.body);

    await validateData(categoryDto);

    const category = this.categoryRepository.create(categoryDto);

    await this.categoryRepository.save(category);

    res.status(201).json({
      success: true,
      message: 'Category created successfully',
      data: category
    });
  };

  public static update: RequestHandler = async (
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> => {
    const { id } = req.params;
    const categoryDto = plainToInstance(CategoryUpdateDto, req.body);

    await validateData(categoryDto);

    const category = await getOneAndValidate(
      this.categoryRepository,
      Number(id)
    );

    this.categoryRepository.merge(category as Category, categoryDto);

    await this.categoryRepository.save(category);

    res.status(200).json({
      success: true,
      message: 'Category updated successfully',
      data: category
    });
  };

  public static remove: RequestHandler = async (
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> => {
    const { id } = req.params;
    const category = await getOneAndValidate(
      this.categoryRepository,
      Number(id)
    );

    await this.categoryRepository.remove(category as Category);

    res.status(200).json({
      success: true,
      message: 'Category removed successfully'
    });
  };
}
