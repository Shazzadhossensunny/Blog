/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
import { ErrorRequestHandler } from 'express';
import { ZodError } from 'zod';
import config from '../config';
import ApiError from '../errors/AppError';

export const globalErrorRequestHandler: ErrorRequestHandler = (
  error,
  req,
  res,
  next,
) => {
  let statusCode = 500;
  let message = 'Internal Server Error';
  let errorMessages: { path: string; message: any }[] = [];

  if (error instanceof ZodError) {
    statusCode = 400;
    message = 'Validation Error';
    errorMessages = error.errors.map((err) => ({
      path: err.path.join('.'),
      message: err.message,
    }));
  } else if (error instanceof ApiError) {
    statusCode = error.statusCode;
    message = error.message;
    errorMessages = error.error ? [{ path: '', message: error.error }] : [];
  } else if (error instanceof Error) {
    message = error.message;
    errorMessages = [{ path: '', message: error.message }];
  }

  res.status(statusCode).json({
    success: false,
    message,
    errorMessages,
    stack: config.NODE_ENV === 'development' ? error.stack : undefined,
  });
};
