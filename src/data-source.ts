import 'dotenv/config';
import 'reflect-metadata';
import { DataSource, DataSourceOptions } from 'typeorm';
import { SeederOptions } from 'typeorm-extension';
import { CategorySeeder } from './seeds/categorySeeder';
import { TransactionSeeder } from './seeds/transactionSeeder';

const options: DataSourceOptions & SeederOptions = {
  type: 'sqlite',
  database: process.env.DATABASE!,
  entities: [`${__dirname}/**/entities/*.{ts,js}`],
  migrations: [`${__dirname}/**/migrations/*.{ts,js}`],
  seeds: [CategorySeeder, TransactionSeeder]
};

export const AppDataSource = new DataSource(options);
