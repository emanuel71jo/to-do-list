import * as Yup from 'yup';

import Task from '../models/Task';
import Category from '../models/Category';

class TaskController {
  async index(req, res) {
    const { order, page = 1 } = req.query;
    let tasks;

    if (order) {
      tasks = await Task.findAll({
        order: [['content', order]],
        offset: (page - 1) * 10,
        limit: 10,
      });
    } else {
      tasks = await Task.findAll({
        offset: (page - 1) * 10,
        limit: 10,
      });
    }

    return res.json(tasks);
  }

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

  async delete(req, res) {
    const { id } = req.params;

    const task = await Task.destroy({ where: { id } });

    return res.json(task);
  }

  async update(req, res) {
    const { id } = req.params;

    const task = await Task.findOne({ where: { id } });

    if (!task) {
      return res.status(404).json({ error: 'Task not found' });
    }

    await task.update({ completed: !task.completed });

    return res.json(task);
  }
}

export default new TaskController();
