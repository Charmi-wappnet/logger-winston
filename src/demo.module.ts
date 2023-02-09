import { Module } from '@nestjs/common';
import { NestjsWinstonLoggerModule } from 'nestjs-winston-logger';
import { format, transports } from 'winston';
import { DemoService } from './demo.service';

@Module({
    imports: [
        NestjsWinstonLoggerModule.forRoot({
            format: format.combine(
                format.timestamp({format: "isoDateTime"}),
                format.json(),
                format.colorize({ all: true }),
            ),
        }),
    ],
    providers: [DemoService],
})
export class DemoModule {}