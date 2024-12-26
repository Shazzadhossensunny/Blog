/* eslint-disable @typescript-eslint/no-explicit-any */
// class AppError extends Error {
//   public statusCode: number;
//   constructor(statusCode: number, message: string, stack = '') {
//     super(message);
//     this.statusCode = statusCode;

//     if (stack) {
//       this.stack = stack;
//     } else {
//       Error.captureStackTrace(this, this.constructor);
//     }
//   }
// }

// export default AppError;

class ApiError extends Error {
  statusCode: number;
  error?: any;

  constructor(statusCode: number, message: string, error?: any) {
    super(message);
    this.statusCode = statusCode;
    this.error = error;
  }
}

export default ApiError;
