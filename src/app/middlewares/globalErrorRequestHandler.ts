/* eslint-disable @typescript-eslint/no-explicit-any */
import { ErrorRequestHandler } from 'express';
import { ZodError } from 'zod';
import config from '../config';
import AppError from '../errors/AppError';

export const globalErrorRequestHandler: ErrorRequestHandler = (
  error,
  req,
  res,
) => {
  let statusCode = 500;
  let message = 'Internal Server Error';
  let errorDetails: { path: string; message: any }[] = [];

  if (error instanceof ZodError) {
    statusCode = 400;
    message = 'Validation Error';
    errorDetails = error.errors.map((err) => ({
      path: err.path.join('.'),
      message: err.message,
    }));
  } else if (error instanceof AppError) {
    statusCode = error.statusCode;
    message = error.message;
    errorDetails = error.error ? [{ path: '', message: error.error }] : [];
  } else if (error instanceof Error) {
    message = error.message;
    errorDetails = [{ path: '', message: error.message }];
  }

  res.status(statusCode).json({
    success: false,
    message,
    statusCode,
    error: errorDetails || { details: 'No additional details available' },
    stack: config.NODE_ENV === 'development' ? error.stack : undefined,
  });
};
