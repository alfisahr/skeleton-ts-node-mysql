import { NextFunction, Request, Response } from 'express';

interface MyInterface {
   (
      req: Request,
      res: Response,
      next: NextFunction
   ): {
      catch: (next: NextFunction) => void;
   };
}

export default (fn: MyInterface) => {
   return (req: Request, res: Response, next: NextFunction) => {
      fn(req, res, next).catch(next);
   };
};
