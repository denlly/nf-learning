import { ExceptionFilter, Catch } from '@nestjs/common';
import { HttpException } from '@nestjs/common';
import { Response } from 'express';

@Catch(HttpException)
export class HttpExceptionFilter implements ExceptionFilter {
    catch(exception: HttpException, response: Response) {
        const status = exception.getStatus();
        const success = status < 400;

        response.status(status).json({ statusCode: status, message: exception.message });
    }
}
