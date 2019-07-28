import { Request, Response, NextFunction } from 'express';
import { BAD_REQUEST, CONFLICT } from 'http-status-codes';

export function validateNameLength(
  req: Request,
  res: Response,
  next: NextFunction
) {
  const name: string = req.body.name;
  if (!name || name.length < 3) {
    return res.status(CONFLICT).send(`The name length need to be 3 at least`);
  }
  next();
}

export function validateIdLength(
  req: Request,
  res: Response,
  next: NextFunction
) {
  const id = req.params.id;
  if (id === undefined || id === null || id.length !== 36) {
    return res.status(BAD_REQUEST).send('id must be 36 length');
  }
  next();
}
