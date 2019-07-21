import { Product } from "../models";
import {
  getProducts,
  addProducts,
  findProductById,
  updateProduct,
  removeProduct
} from "../models/productModel";
import { OK, CREATED, NOT_FOUND, NO_CONTENT } from "http-status-codes";
import { Request, Response } from "express";
import uuidv1 from "uuid/v1";

async function findAll(req: Request, res: Response) {
  const products = await getProducts();
  res.status(OK).send(products);
}

async function create(req: Request, res: Response) {
  const newProduct: Product = res.locals.newProduct;
  newProduct.id = uuidv1();
  const addedProduct = await addProducts(newProduct);
  res.status(CREATED).send(addedProduct);
}

async function findById(req: Request, res: Response) {
  console.log("findById");
  console.log(req.params.id);
  const product = await findProductById(req.params.id);
  if (product !== undefined) {
    res.status(OK).send(product);
  } else {
    res.status(NOT_FOUND).send("no such item");
  }
}

async function update(req: Request, res: Response) {
  const id = req.params.id;
  const product = await updateProduct(id, req.body);
  if (product === undefined) {
    res.status(NOT_FOUND).send("product not found");
  } else {
    res.status(OK).send(product);
  }
}
async function remove(req: Request, res: Response) {
  const removed = await removeProduct(req.params.id);
  if (removed == true) {
    res.status(NO_CONTENT).send("product removed");
  } else {
    res.status(NOT_FOUND).send("product not found");
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
