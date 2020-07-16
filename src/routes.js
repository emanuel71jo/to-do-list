import { Router } from 'express';

import TaskController from './app/controllers/TaskController';

const routes = new Router();

routes.post('/task', TaskController.store);

export default routes;
