import Category from '../models/Category';

class CategoryController {
  async index(req, res) {
    const { order } = req.query;
    let categories;

    if (order) {
      categories = await Category.findAll({
        order: [['name', order]],
      });
    } else {
      categories = await Category.findAll();
    }

    return res.json(categories);
  }

  async store(req, res) {
    const { name } = req.body;

    const { id } = await Category.create({ name });

    return res.json(id);
  }

  async delete(req, res) {
    const { id } = req.params;

    const category = await Category.destroy({ where: { id } });

    return res.json(category);
  }

  async update(req, res) {
    const category = await Category.findByPk(req.params.id);

    if (!category) {
      return res.status(404).json({ error: 'Category does not exist' });
    }

    await category.update({ name: req.body.name });

    return res.json(category);
  }
}

export default new CategoryController();
