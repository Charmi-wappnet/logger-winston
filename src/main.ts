import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import {
  NestjsWinstonLoggerService,
  appendRequestIdToLogger,
  LoggingInterceptor,
  morganRequestLogger,
  morganResponseLogger,
  appendIdToRequest
} from 'nestjs-winston-logger';

import { format, transports } from 'winston';
// import { HelmetMiddleware } from '@nest-middlewares/helmet'

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  // app.use(HelmetMiddleware);

  const globalLogger = new NestjsWinstonLoggerService({
    format: format.combine(
    format.timestamp({ format: "isoDateTime" }),
    format.json(),
    format.colorize({ all: true }),
  ),
  transports: [
    new transports.File({filename: "error.log", level: "error" }),
    new transports.File({ filename: "combined.log"}),
    new transports.Console(),
  ],
});

app.useLogger(globalLogger);

app.use(appendIdToRequest);
app.use(appendRequestIdToLogger(globalLogger));

app.use(morganRequestLogger(globalLogger));
app.use(morganResponseLogger(globalLogger));

app.useGlobalInterceptors(new LoggingInterceptor(globalLogger));

const port = process.env.PORT || 4000;
await app.listen(port).then(() => {
  console.log(`server running on ${port}`);
});

}

bootstrap();