import faker from 'faker';
import { factory } from 'factory-girl';

import Task from '../src/app/models/Task';
import Category from '../src/app/models/Category';

factory.define('Task', Task, {
  content: faker.lorem.sentence(),
  category_id: -1,
});

factory.define('Category', Category, {
  name: faker.lorem.word(),
});

export default factory;
