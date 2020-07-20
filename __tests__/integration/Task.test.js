import request from 'supertest';
import app from '../../src/app';

import factory from '../factories';
import truncate from '../utils/truncate';

describe('Task', () => {
  beforeEach(async () => {
    await truncate();
  });

  afterEach(async () => {
    await truncate();
  });

  beforeAll(async () => {
    await truncate();
  });

  afterAll(async () => {
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

    const firstTask = await factory.create('Task', {
      category_id: category.dataValues.id,
    });

    const secondTask = await factory.create('Task', {
      category_id: category.dataValues.id,
    });

    const response = await request(app).get('/task');

    expect(response.body[0].id).toBe(firstTask.id);
    expect(response.body[1].id).toBe(secondTask.id);
  });

  it('should list two tasks registered, list in order ascendente', async () => {
    const category = await factory.create('Category');

    const firstTask = await factory.create('Task', {
      content: 'BBBBBB',
      category_id: category.dataValues.id,
    });

    const secondTask = await factory.create('Task', {
      content: 'AAAAAAA',
      category_id: category.dataValues.id,
    });

    const response = await request(app).get('/task?order=asc');

    expect(response.body[0].id).toBe(secondTask.id);
    expect(response.body[1].id).toBe(firstTask.id);
  });

  it('should list two tasks registered, list in order descendente', async () => {
    const category = await factory.create('Category');

    const firstTask = await factory.create('Task', {
      content: 'AAAAA',
      category_id: category.dataValues.id,
    });

    const secondTask = await factory.create('Task', {
      content: 'BBBBB',
      category_id: category.dataValues.id,
    });

    const response = await request(app).get('/task?order=desc');

    expect(response.body[0].id).toBe(secondTask.id);
    expect(response.body[1].id).toBe(firstTask.id);
  });

  it('should list ten first tasks registers', async () => {
    const category = await factory.create('Category');

    await factory.create('Task', { category_id: category.dataValues.id });
    await factory.create('Task', { category_id: category.dataValues.id });
    await factory.create('Task', { category_id: category.dataValues.id });
    await factory.create('Task', { category_id: category.dataValues.id });
    await factory.create('Task', { category_id: category.dataValues.id });
    await factory.create('Task', { category_id: category.dataValues.id });
    await factory.create('Task', { category_id: category.dataValues.id });
    await factory.create('Task', { category_id: category.dataValues.id });
    await factory.create('Task', { category_id: category.dataValues.id });
    await factory.create('Task', { category_id: category.dataValues.id });
    const tasksPageTwo = await factory.create('Task', {
      category_id: category.dataValues.id,
    });
    await factory.create('Task', { category_id: category.dataValues.id });
    await factory.create('Task', { category_id: category.dataValues.id });
    await factory.create('Task', { category_id: category.dataValues.id });

    const response = await request(app).get('/task?page=2');

    expect(response.body[0].id).toBe(tasksPageTwo.id);
  });

  it('should not return a task who was deleted', async () => {
    const category = await factory.create('Category');

    const firstTask = await factory.create('Task', {
      category_id: category.dataValues.id,
    });

    const response = await request(app).delete(`/task/${firstTask.id}`);

    const tasks = await request(app).get('/task');

    expect(response.status).toBe(200);

    expect(tasks.body.length).toBe(0);
  });

  it('should marked a task as completed', async () => {
    const category = await factory.create('Category');

    const firstTask = await factory.create('Task', {
      category_id: category.dataValues.id,
    });

    let tasks = await request(app).get('/task');

    expect(tasks.body[0].completed).toBe(false);

    await request(app).put(`/task/${firstTask.id}`);

    tasks = await request(app).get('/task');

    expect(tasks.body[0].completed).toBe(true);
  });
});
