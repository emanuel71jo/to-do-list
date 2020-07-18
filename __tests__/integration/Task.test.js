import request from 'supertest';
import app from '../../src/app';

import factory from '../factories';
import truncate from '../utils/truncate';

describe('Task', () => {
  beforeEach(async () => {
    await truncate();
  });

  it('should return an error 400 of validation fails', async () => {
    const task = await factory.attrs('Task', { category_id: null });

    const response = await request(app)
      .post('/task')
      .send(task);

    expect(response.status).toBe(400);
  });

  it('should not permitted create a task without a category exists', async () => {
    let task = await factory.attrs('Task');
    task = { ...task, category_id: 1 };

    const response = await request(app)
      .post('/task')
      .send(task);

    expect(response.status).toBe(404);
  });

  it('should be permitted create a task', async () => {
    const { id } = await factory.create('Category');

    let task = await factory.attrs('Task');
    task = { ...task, category_id: id };

    const response = await request(app)
      .post('/task')
      .send(task);

    expect(response.status).toBe(200);
  });

  it('should list a registered', async () => {
    const category = await factory.create('Category');

    const { id } = await factory.create('Task', {
      category_id: category.dataValues.id,
    });

    const response = await request(app).get('/task');

    const tasks = response.body;

    expect(id).toBe(tasks[0].id);
  });

  it('should list two tasks registered, list in order it was created', async () => {
    const category = await factory.create('Category');

    const { id: firstTask } = await factory.create('Task', {
      category_id: category.dataValues.id,
    });

    const { id: secondTask } = await factory.create('Task', {
      category_id: category.dataValues.id,
    });

    const response = await request(app).get('/task');

    const [idOne, idTwo] = response.body.map(task => task.id);

    expect(idOne).toEqual(firstTask);
    expect(idTwo).toEqual(secondTask);
  });

  /**
   * Listar em ordem crescente e decrescente
   */
});
