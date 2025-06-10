import express from 'express';
import { TransactionController } from '../controllers/transactionController';

export const transactionRoutes = express
  .Router()
  .get('/transactions', TransactionController.getAll)
  .get('/transactions/:id', TransactionController.getOne)
  .post('/transactions', TransactionController.create)
  .put('/transactions/:id', TransactionController.update)
  .delete('/transactions/:id', TransactionController.remove);
