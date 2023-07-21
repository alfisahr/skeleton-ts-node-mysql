import { NextFunction, Request, Response } from 'express';
import AppError from '../middleware/appError';

interface ErrorInterface {
   statusCode: number;
   status: string;
   success: boolean;
   isOperational: boolean;
   message: string;
   stack: void;
   path: string;
   value: string;
   name: string;
}

const handleCastErrorDB = (err: ErrorInterface) => {
   const message = `Invalid ${err.path}: ${err.value}`;
   return new AppError(message, 400);
};

// const handleDuplicateFieldsDB = (err) => {
//    const key = Object.keys(err.keyValue);
//    const value = err.keyValue[key];
//    const message = `Duplicate field ${key}. ${value} already exist.`;

//    return new AppError(message, 400);
// };

// const handleValidationErrorDB = (err) => {
//    const fields = Object.keys(err.errors);
//    const errors = fields.map((item) => err.errors[item].message);

//    const message = `Invalid input data. ${errors.join('. ')}`;
//    return new AppError(message, 400);
// };

const sendErrorDev = (err: ErrorInterface, res: Response): Response => {
   return res.status(err.statusCode).json({
      success: err.success,
      status: err.status,
      error: err,
      message: err.message,
      stack: err.stack,
   });
};

const sendErrorProd = (err: ErrorInterface, res: Response): Response => {
   // Operational, trusted error: send message to client
   if (err.isOperational) {
      return res.status(err.statusCode).json({
         success: err.success,
         status: err.status,
         message: err.message,
      });

      // Programming or other unknown error: don't leak error details
   } else {
      // 1) Log error
      console.error('ERROR ', err);

      // 2) Send general message
      return res.status(500).json({
         success: false,
         status: 'error',
         message: 'Something went very wrong',
      });
   }
};

export default (
   err: ErrorInterface,
   req: Request,
   res: Response,
   next: NextFunction
) => {
   err.statusCode = err.statusCode || 500;
   err.status = err.status || 'error';
   err.success = err.success || false;

   if (process.env.NODE_ENV === 'development') {
      sendErrorDev(err, res);
   } else if (process.env.NODE_ENV === 'production') {
      let error: ErrorInterface = { ...err };
      console.log(error.hasOwnProperty('errors'));

      //   if (
      //      error.hasOwnProperty('errors') &&
      //      Object.keys(error.errors).length > 0
      //   ) {
      //      error = handleValidationErrorDB(error);
      //   }
      //   if (error.code === 11000) {
      //      error = handleDuplicateFieldsDB(error);
      //   }
      // if (error.name === 'CastError') {
      //    error = handleCastErrorDB(error);
      // }

      sendErrorProd(error, res);
   }
};
