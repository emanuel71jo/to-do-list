import Sequelize, { Model } from 'sequelize';

class Category extends Model {
  static init(sequelize) {
    super.init(
      {
        name: Sequelize.STRING,
      },
      { sequelize }
    );

    return this;
  }

  static associate(models) {
    this.hasMany(models.Task, { foreignKey: 'category_id', as: 'task' });
  }
}

export default Category;
