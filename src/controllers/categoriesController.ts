import {
  getCategories,
  findCategoryById,
  addCategory,
  updateCategory,
  removeCategory
} from "../models/categoriesModel";
import { OK, CREATED, NOT_FOUND, NO_CONTENT } from "http-status-codes";
import { Request, Response, NextFunction } from "express";
import { getProductsByCategoryId } from "../models/productModel";

async function findAll(req: Request, res: Response, next: NextFunction) {
  try {
    const categories = await getCategories();
    res.status(OK).send(categories);
  } catch (error) {
    next(error);
  }
}

async function getProductsById(
  req: Request,
  res: Response,
  next: NextFunction
) {
  try {
    const products = await getProductsByCategoryId(req.params.id);
    if (products.length !== 0) {
      return res.status(OK).send(products);
    } else {
      return res.status(NOT_FOUND).send("No products with such category id");
    }
  } catch (error) {
    next(error);
  }
}

async function findById(req: Request, res: Response, next: NextFunction) {
  try {
    const category = await findCategoryById(req.params.id);
    if (category !== undefined) {
      return res.status(OK).send(category);
    }
    return res.status(NOT_FOUND).send("No category with this id");
  } catch (error) {
    next(error);
  }
}

async function create(req: Request, res: Response, next: NextFunction) {
  try {
    const newCategory = await addCategory(req.body);
    res.status(CREATED).send(newCategory);
  } catch (error) {
    next(error);
  }
}

async function update(req: Request, res: Response, next: NextFunction) {
  try {
    const updatedCategory = await updateCategory(req.params.id, req.body);
    if (updatedCategory) return res.status(OK).send(updatedCategory);
    else return res.status(NOT_FOUND).send("no such Category");
  } catch (error) {
    next(error);
  }
}

async function remove(req: Request, res: Response, next: NextFunction) {
  try {
    const removed = await removeCategory(req.params.id);
    if (removed == true) {
      res.status(NO_CONTENT).send("Category removed");
    } else {
      res.status(NOT_FOUND).send("Category not found");
    }
  } catch (error) {
    next(error);
  }
}

const categoryController = {
  findAll,
  create,
  findById,
  update,
  remove,
  getProductsById
};

export default categoryController;
