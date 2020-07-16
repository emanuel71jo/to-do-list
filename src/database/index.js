import Sequelize from 'sequelize';

import databaseConfig from '../config/database';

import Task from '../app/models/Task';
import Category from '../app/models/Category';

const models = [Task, Category];

class Database {
  constructor() {
    this.init();
  }

  init() {
    this.connection = new Sequelize(databaseConfig);

    models
      .map(model => model.init(this.connection))
      .map(model => model.associate && model.associate(this.connection.models));
  }
}

export default new Database();
