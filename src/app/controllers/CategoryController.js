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
}

export default new CategoryController();
