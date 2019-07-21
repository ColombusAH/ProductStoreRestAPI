import { Product } from "../models";
import {
  getProducts,
  addProducts,
  findProductById,
  updateProduct,
  removeProduct
} from "../models/productModel";
import { OK, CREATED, NOT_FOUND, NO_CONTENT } from "http-status-codes";
import { Request, Response, NextFunction } from "express";
import uuidv1 from "uuid/v1";

async function findAll(req: Request, res: Response, next: NextFunction) {
  try {
    const products = await getProducts();
    res.status(OK).send(products);
  } catch (error) {
    next(error);
  }
}

async function create(req: Request, res: Response, next: NextFunction) {
  try {
    const newProduct: Product = res.locals.newProduct;
    newProduct.id = uuidv1();
    const addedProduct = await addProducts(newProduct);
    res.status(CREATED).send(addedProduct);
  } catch (error) {
    next(error);
  }
}

async function findById(req: Request, res: Response, next: NextFunction) {
  try {
    const product = await findProductById(req.params.id);
    if (product !== undefined) {
      res.status(OK).send(product);
    } else {
      res.status(NOT_FOUND).send("no such item");
    }
  } catch (error) {
    next(error);
  }
}

async function update(req: Request, res: Response, next: NextFunction) {
  try {
    const id = req.params.id;
    const product = await updateProduct(id, req.body);
    if (product === undefined) {
      res.status(NOT_FOUND).send("product not found");
    } else {
      res.status(OK).send(product);
    }
  } catch (error) {
    next(error);
  }
}
async function remove(req: Request, res: Response, next: NextFunction) {
  try {
    const removed = await removeProduct(req.params.id);
    if (removed == true) {
      res.status(NO_CONTENT).send("product removed");
    } else {
      res.status(NOT_FOUND).send("product not found");
    }
  } catch (error) {
    next(error);
  }
}
const productController = {
  findAll,
  create,
  findById,
  update,
  remove
};
export { productController };
