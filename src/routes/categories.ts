import { Router } from 'express';
import { validateIdLength } from '../middlewares/validatesMiddlewares';
import categoryController from '../controllers/categoriesController';

const router = Router();
router
  .route('/')
  .get(categoryController.findAll)
  .post(categoryController.create);

router
  .route('/:id')
  .get(validateIdLength, categoryController.findById)
  .put(validateIdLength, categoryController.update)
  .delete(validateIdLength, categoryController.remove);
router
  .route('/:id/products')
  .get(validateIdLength, categoryController.getProductsById);

export default router;
