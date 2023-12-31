class AppError extends Error {
   statusCode: number;
   success: boolean;
   status: string;
   isOperational: boolean;

   constructor(message: string, statusCode: number) {
      super(message);

      this.statusCode = statusCode;
      this.success = false;
      this.status = `${statusCode}`.startsWith('4') ? 'fail' : 'error';
      this.isOperational = true;

      Error.captureStackTrace(this, this.constructor);
   }
}

export default AppError;
