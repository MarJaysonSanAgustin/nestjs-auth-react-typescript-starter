import {
  ExceptionFilter,
  Catch,
  ArgumentsHost,
  HttpException,
} from '@nestjs/common';
import { Response } from 'express';

@Catch(HttpException)
export class HttpExceptionFilter implements ExceptionFilter {
  catch(exception: HttpException, host: ArgumentsHost) {
    const exceptionResponse = exception.getResponse();

    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();
    const status = exception.getStatus();
    const error = {
      statusCode: status,
      message: exceptionResponse || exception?.message || 'Error',
      error: exception.name,
    };

    response.status(status).json(exceptionResponse || error);
  }
}
