var winston = require('winston'), expressWinston = require('express-winston')
require('winston-daily-rotate-file')
const { createLogger, format, transports } = winston
const { combine, timestamp, label, colorize, printf, splat } = format

require('dotenv').config()

const myFormat = printf(info => {
    return `${info.timestamp} ${info.label} ${info.level}, ${info.message} `
})

var consoleRequestLogger = expressWinston.logger({
    format: combine(
        colorize(),
        label({ label: '[app-server-request-logger]'}),
        
        timestamp(),
        splat(),
        myFormat
    ),
    statusLevels: true,
    msg: "HTTP {{req.methopd}} {{req.url}}",
    transports: [
        new transports.Console()
    ]
})

const fileRotateTransport = new winston.transports.DailyRotateFile({
    filename: 'logs/combined-%DATE%.log',
    datePattern: 'YYYY-MM-DD',
    maxFiles: '14d'
})

const errorRotateTransport = new winston.transports.DailyRotateFile({
    filename: 'logs/error-%DATE%.log',
    datePattern: 'YYYY-MM-DD',
    maxFiles: '14d',
    level: 'error'
})

var textLogger = winston.createLogger({
    level: 'info',
    format: combine(
        colorize(),
        label({ label: '[app-server]'}),
        
        timestamp(),
        splat(),
        myFormat
    ),
    defaultMeta: { service: 'user-service'},
    transports: [
        fileRotateTransport,
        errorRotateTransport,
        new transports.Console()
    ]

})

var buggyLogger = expressWinston.logger({
    transports: [
        new winston.transports.Console()
    ],
    format: winston.format.combine(
        winston.format.colorize(),
        winston.format.json()
    ),
    meta: true,
    msg: "HTTP {{req.method}} {{req.url}}",
    expressFormat: true,
    colorize: false,
    ignoreRoute: function (_, _) { return false;}
});

module.exports = {
    consoleRequestLogger,
    textLogger,
    buggyLogger
}