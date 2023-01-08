import { Result, ValidationError } from 'express-validator';

class AppError extends Error {
  statusCode = 500;
  errors: Result<ValidationError>;

  constructor(message: string, statusCode?: number, errors?: Result<ValidationError>) {
    super(message);
    if (statusCode) {
      this.statusCode = statusCode;
    }
    this.errors = errors;
  }
}

export default AppError;
