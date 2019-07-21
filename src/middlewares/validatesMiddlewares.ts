import { Request, Response, NextFunction } from "express";
import { Product } from "../models";
import { BAD_REQUEST, CONFLICT } from "http-status-codes";

export function validateNameLength(
  req: Request,
  res: Response,
  next: NextFunction
) {
  const newProduct: Product = req.body;
  if (!newProduct || !newProduct.name || newProduct.name.length < 3) {
    return res
      .status(CONFLICT)
      .send(`The name length need to be 3 at least`);
  }
  res.locals.newProduct = newProduct;
  next();
}

export function validateIdLength(
  req: Request,
  res: Response,
  next: NextFunction
) {
  const id = req.params.id;
  if (id === undefined || id === null || id.length !== 36) {
    return res.status(BAD_REQUEST).send("id must be 36 length");
  }
  next();
}
