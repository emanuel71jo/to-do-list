import { Router } from 'express';

import TaskController from './app/controllers/TaskController';
import CategoryController from './app/controllers/CategoryController';

import validateCategoryStore from './app/validators/CategoryStore';
import validateCategoryUpdate from './app/validators/CategoryUpdate';
import validateTaskStore from './app/validators/TaskStore';

const routes = new Router();

routes.get('/task', TaskController.index);
routes.post('/task', validateTaskStore, TaskController.store);
routes.delete('/task/:id', TaskController.delete);
routes.put('/task/:id', TaskController.update);

routes.get('/category', CategoryController.index);
routes.post('/category', validateCategoryStore, CategoryController.store);
routes.delete('/category/:id', CategoryController.delete);
routes.put('/category/:id', validateCategoryUpdate, CategoryController.update);

export default routes;
