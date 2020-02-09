import * as winston from 'winston';
import {Properties} from './configuration';

/*
    Class for managing our internal logger
 */
export class Logger {
    private static instance: Logger;
    private logger: winston.Logger;
private config;

    private constructor() {
        const levels = {
            levels: {
                error: 0,
                warn: 1,
                info: 2,
                verbose: 3,
                debug: 4,
                silly: 5
            },
            colors: {
                error: 'red',
                warn: 'yellow',
                info: 'green',
                verbose: 'cyan',
                debug: 'blue',
                silly: 'green'
            }
        };

        this.config = Properties.getServicesProperties();

        this.logger = winston.createLogger({
            level: this.config.properties.WINSTON_LOG_LEVEL || 'info',
            levels: levels.levels,
            format: winston.format.combine(winston.format.colorize(), winston.format.simple()),
            transports: [
                new winston.transports.Console(),
                new winston.transports.File({
                    filename: './logs/errors.log',
                    level: 'error'
                })
            ],
            exceptionHandlers: [new winston.transports.Console()],
            exitOnError: true
        });

        this.logger.info(`Logger initialised with level set to : ${this.logger.level}`);
    }

    public static getInstance() {
        if (!Logger.instance) {
            Logger.instance = new Logger();
        }
        return Logger.instance.logger;
    }

    public error(message: string, meta?: any) {
        const formattedMetaData = this.formatMetaData(meta);
        this.logger.error(message, formattedMetaData);
    }

    public warn(message: string, meta?: any) {
        const formattedMetaData = this.formatMetaData(meta);
        this.logger.warn(message, formattedMetaData);
    }

    public info(message: string, meta?: any) {
        const formattedMetaData = this.formatMetaData(meta);
        this.logger.info(message, formattedMetaData);
    }

    public verbose(message: string, meta?: any) {
        const formattedMetaData = this.formatMetaData(meta);
        this.logger.verbose(message, formattedMetaData);
    }

    public debug(message: string, meta?: any) {
        const formattedMetaData = this.formatMetaData(meta);
        this.logger.debug(message, formattedMetaData);
    }

    public silly(message: string, meta?: any) {
        const formattedMetaData = this.formatMetaData(meta);
        this.logger.silly(message, formattedMetaData);
    }

    private formatMetaData(meta?: any) {
        let copy: any;

        if (meta == null || typeof meta !== 'object') {
            return meta;
        }

        if (meta instanceof Error) {
            return meta.stack;
        }

        if (meta instanceof Date || meta instanceof RegExp) {
            return meta;
        }

        if (meta instanceof Array) {
            copy = [];
            for (const i in meta) {
                if (meta.hasOwnProperty(i)) {
                    copy[i] = this.formatMetaData(meta[i]);
                }
            }
            return copy;
        } else {
            return meta;
        }
    }
}

export default Logger.getInstance();
