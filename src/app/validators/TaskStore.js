import * as Yup from 'yup';

export default async (req, res, next) => {
  try {
    const schema = await Yup.object().shape({
      content: Yup.string().required(),
      category_id: Yup.number().required(),
    });

    await schema.validate(req.body, { abortEarly: false });

    return next();
  } catch (error) {
    return res.status(400).json({ error: 'Validation failed' });
  }
};
