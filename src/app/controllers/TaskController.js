import * as Yup from 'yup';

import Task from '../models/Task';
import Category from '../models/Category';

class TaskController {
  async store(req, res) {
    const schema = await Yup.object().shape({
      content: Yup.string().required(),
      category_id: Yup.number().required(),
    });

    if (!(await schema.isValid(req.body))) {
      return res.status(400).json({ error: 'Validation failed' });
    }

    const categoryExists = await Category.findOne({
      where: { id: req.body.category_id },
    });

    if (!categoryExists) {
      return res.status(404).json({ error: 'Category does not exist' });
    }

    const { content, category_id } = req.body;

    const { id } = await Task.create({ content, category_id });

    return res.json(id);
  }
}

export default new TaskController();
