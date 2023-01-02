import path from 'path';
import express from 'express';
import { body } from 'express-validator/check';

import * as adminController from '../controllers/admin';
import isAuth from '../middleware/isAuth';

const router = express.Router();

// /admin/add-product => GET
router.get('/add-product', isAuth, adminController.getAddProduct);

// /admin/products => GET
router.get('/products', isAuth, adminController.getProducts);

// /admin/add-product => POST
router.post('/add-product', [
    body('title').isString().isLength({ min: 3 }).trim(),
    body('price').isFloat(),
    body('description').isLength({ min: 5, max: 400 }).trim()
  ], isAuth, adminController.postAddProduct
);

router.get('/edit-product/:productId', isAuth, adminController.getEditProduct);

router.post('/edit-product', [
    body('title').isString().isLength({ min: 3 }).trim(),
    body('price').isFloat(),
    body('description').isLength({ min: 5, max: 400 }).trim()
  ], isAuth, adminController.postEditProduct
);

router.delete('/delete-product', isAuth, adminController.deleteProduct);

export default router;
