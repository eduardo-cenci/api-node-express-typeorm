import express from 'express';
import { CategoryController } from '../controllers/categoryController';

export const categoryRoutes = express
  .Router()
  .get('/categories', CategoryController.getAll)
  .get('/categories/:id', CategoryController.getOne)
  .post('/categories', CategoryController.create)
  .put('/categories/:id', CategoryController.update)
  .delete('/categories/:id', CategoryController.remove);
