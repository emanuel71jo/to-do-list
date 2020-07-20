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

  it('should return nothing category', async () => {
    const response = await request(app).get('/category');

    expect(response.body.length).toBe(0);
  });

  it('should return all categories', async () => {
    const category = await factory.create('Category');

    const response = await request(app).get('/category');

    expect(response.body[0].id).toBe(category.id);
  });
});
