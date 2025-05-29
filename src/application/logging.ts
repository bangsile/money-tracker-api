import * as winston from "winston";

export const logger = winston.createLogger({
	level: "debug",
	format: winston.format.combine(
		winston.format.colorize(),
		winston.format.timestamp(),
		winston.format.printf(({ level, message, timestamp }) => {
			const msg =
				typeof message === "object"
					? JSON.stringify(message, null, 2)
					: message;
			return `[${timestamp}] ${level}: ${msg}`;
		})
	),
	transports: [new winston.transports.Console({})],
});
