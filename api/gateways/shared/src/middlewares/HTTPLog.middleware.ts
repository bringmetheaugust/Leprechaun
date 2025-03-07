import { Injectable, NestMiddleware } from '@nestjs/common';
import { Request, Response, NextFunction } from 'express';

import LoggerService from '../modules/logger/logger.service';

@Injectable()
export default class HTTPLogMiddleware implements NestMiddleware {
    constructor(
        private readonly loggserService: LoggerService,
    ) { }

    use(request: Request, response: Response, next: NextFunction): void {
        this.loggserService.setContext('HTTP_REQUEST');
        const { method, originalUrl } = request;

        this.loggserService.verbose(`${method} ${originalUrl}`);

        response.on('finish', () => {
            this.loggserService.setContext('HTTP_RESPONSE');
            const { statusCode } = response;
            const res = `${method} ${originalUrl} ${statusCode}`;

            statusCode >= 400
                ? this.loggserService.error(res)
                : this.loggserService.log(res)
        });

        next();
    }
}
