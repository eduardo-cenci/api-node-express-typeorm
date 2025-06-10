/* eslint-disable @typescript-eslint/no-unused-vars */

import { DataSource } from 'typeorm';
import { Seeder, SeederFactoryManager } from 'typeorm-extension';
import { Category } from '../entities/Category';

export class CategorySeeder implements Seeder {
  public async run(
    dataSource: DataSource,
    factoryManager: SeederFactoryManager
  ): Promise<void> {
    const categoryRepository = dataSource.getRepository(Category);
    const categories = Array.from({ length: 10 }, (item, index) => {
      return { description: 'Category ' + (index + 1) };
    });

    await categoryRepository.insert(categories);
  }
}
