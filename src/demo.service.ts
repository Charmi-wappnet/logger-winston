import { Injectable } from "@nestjs/common";
import { NestjsWinstonLoggerService, InjectLogger } from "nestjs-winston-logger";

@Injectable()
export class DemoService {
    constructor(@InjectLogger(DemoService.name) private logger: NestjsWinstonLoggerService) {}
}