/* eslint-disable @typescript-eslint/no-unused-vars */

import { DataSource } from 'typeorm';
import { Seeder, SeederFactoryManager } from 'typeorm-extension';
import { Transaction } from '../entities/Transaction';
import { Category } from '../entities/Category';

export class TransactionSeeder implements Seeder {
  public async run(
    dataSource: DataSource,
    factoryManager: SeederFactoryManager
  ): Promise<void> {
    const transactionRepository = dataSource.getRepository(Transaction);
    const categoryRepository = dataSource.getRepository(Category);
    const categories = await categoryRepository.find();
    const transactions = Array.from({ length: 100 }, (item, index) => {
      return {
        // generates a random number between 1000 and -1000
        value: parseFloat((Math.random() * 2000 - 1000).toFixed(2)),
        description: 'Transaction ' + (index + 1),
        // generates a random date within the last year
        date: new Date(new Date().getTime() - Math.random() * 31536000000),
        category: categories[Math.floor(Math.random() * categories.length)]
      };
    });

    await transactionRepository.insert(transactions);
  }
}
