import categeorieService from "../models/categoriesModel";
import { OK, CREATED, NOT_FOUND, NO_CONTENT } from "http-status-codes";
import { Request, Response, NextFunction } from "express";
import productService from "../models/productModel";

async function findAll(req: Request, res: Response, next: NextFunction) {
  try {
    const categories = await categeorieService.getCategories();
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
    const products = await productService.getProductsByCategoryId(
      req.params.id
    );
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
    const category = await categeorieService.findCategoryById(req.params.id);
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
    const newCategory = await categeorieService.addCategory(req.body);
    res.status(CREATED).send(newCategory);
  } catch (error) {
    next(error);
  }
}

async function update(req: Request, res: Response, next: NextFunction) {
  try {
    const updatedCategory = await categeorieService.updateCategory(
      req.params.id,
      req.body
    );
    if (updatedCategory) return res.status(OK).send(updatedCategory);
    else return res.status(NOT_FOUND).send("no such Category");
  } catch (error) {
    next(error);
  }
}

async function remove(req: Request, res: Response, next: NextFunction) {
  try {
    const removed = await categeorieService.removeCategory(req.params.id);
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
