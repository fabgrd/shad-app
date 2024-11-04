"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const winston_transport_1 = __importDefault(require("winston-transport"));
/**
 * https://stackoverflow.com/a/41407246
 * Log level escpace codes
 */
const levelStyleMap = {
    error: '\x1b[41m%s\x1b[0m',
    warn: '\x1b[33m%s\x1b[0m',
    info: '\x1b[94m%s\x1b[0m',
    verbose: '\x1b[35m%s\x1b[0m',
    debug: '\x1b[32m%s\x1b[0m',
    silly: '\x1b[36m%s\x1b[0m'
};
class ConsoleLogTransport extends winston_transport_1.default {
    log(info, callback) {
        var _a;
        const label = ((_a = info.consoleLoggerOptions) === null || _a === void 0 ? void 0 : _a.label) || info.level.toUpperCase();
        const finalMessage = `[${new Date().toISOString()}] [${label}] ${info.message}`;
        console.log(levelStyleMap[info.level], finalMessage);
        info.stack && console.log('\t', info.stack);
        callback();
    }
}
exports.default = ConsoleLogTransport;
