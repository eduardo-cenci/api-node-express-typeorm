import 'dotenv/config';
import express from 'express';
import { AppDataSource } from './data-source';
import { bodyChecker } from './middlewares/bodyChecker';
import { notFoundHandler } from './middlewares/notFoundHandler';
import { errorHandler } from './middlewares/errorHandler';
import { categoryRoutes } from './routes/categoryRoutes';
import { transactionRoutes } from './routes/transactionRoutes';
import swaggerUi from 'swagger-ui-express';
import swaggerJson from '../swagger.json';

AppDataSource.initialize().then(() => {
  const app = express();
  const port = process.env.APP_PORT;

  app.use(express.json());
  app.use(bodyChecker);
  app.use('/docs', swaggerUi.serve, swaggerUi.setup(swaggerJson));
  app.use(categoryRoutes, transactionRoutes);
  app.use(notFoundHandler);
  app.use(errorHandler);
  app.listen(port, () => console.log(`Server listening on port ${port}`));
});
