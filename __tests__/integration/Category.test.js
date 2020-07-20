import request from 'supertest';
import app from '../../src/app';

import factory from '../factories';
import truncate from '../utils/truncate';

describe('Category', () => {
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

  it('should return nothing category', async () => {
    const response = await request(app).get('/category');

    expect(response.body.length).toBe(0);
  });

  it('should return all categories', async () => {
    const category = await factory.create('Category');

    const response = await request(app).get('/category');

    expect(response.body[0].id).toBe(category.id);
  });

  it('should return a category created', async () => {
    const category = await factory.attrs('Category');

    const response = await request(app)
      .post('/category')
      .send(category);

    expect(response.status).toBe(200);
  });

  it('should return error 400, error Validation Fails', async () => {
    const category = await factory.attrs('Category', { name: null });

    const response = await request(app)
      .post('/category')
      .send(category);

    expect(response.status).toBe(400);
  });

  it('should return a category created in order ascendente', async () => {
    const firstCategory = await factory.create('Category');
    const secondCategory = await factory.create('Category');

    const response = await request(app).get('/category?order=asc');

    expect(response.body[0].id).toBe(firstCategory.id);
    expect(response.body[1].id).toBe(secondCategory.id);
  });
});
