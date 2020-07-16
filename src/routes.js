import { Router } from 'express';

import TaskController from './app/controllers/TaskController';
import CategoryController from './app/controllers/CategoryController';

const routes = new Router();

routes.get('/task', TaskController.index);
routes.post('/task', TaskController.store);
routes.delete('/task/:id', TaskController.delete);
routes.put('/task/:id', TaskController.update);

routes.get('/category', CategoryController.index);
routes.post('/category', CategoryController.store);
routes.delete('/category/:id', CategoryController.delete);
routes.put('/category/:id', CategoryController.update);

export default routes;
