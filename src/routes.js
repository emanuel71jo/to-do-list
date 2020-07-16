import { Router } from 'express';

import TaskController from './app/controllers/TaskController';
import CategoryController from './app/controllers/CategoryController';

const routes = new Router();

routes.post('/task', TaskController.store);

routes.get('/category', CategoryController.index);
routes.post('/category', CategoryController.store);

export default routes;
