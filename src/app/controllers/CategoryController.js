import * as Yup from 'yup';

import Category from '../models/Category';

class CategoryController {
  async index(req, res) {
    const categories = await Category.findAll();

    return res.json(categories);
  }

  async store(req, res) {
    const schema = await Yup.object().shape({
      name: Yup.string().required(),
    });

    if (!(await schema.isValid(req.body))) {
      return res.status(400).json({ error: 'Validation failed' });
    }

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
    const schema = await Yup.object().shape({
      name: Yup.string().required(),
    });

    if (!(await schema.isValid(req.body))) {
      return res.status(400).json({ error: 'Validation failed' });
    }

    const category = await Category.findByPk(req.params.id);

    if (!category) {
      return res.status(404).json({ error: 'Category does not exist' });
    }

    await category.update({ name: req.body.name });

    return res.json(category);
  }
}

export default new CategoryController();
