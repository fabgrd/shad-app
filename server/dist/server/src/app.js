"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const body_parser_1 = __importDefault(require("body-parser"));
const compression_1 = __importDefault(require("compression"));
const path_1 = __importDefault(require("path"));
const express_1 = __importDefault(require("express"));
const routes_1 = __importDefault(require("./routes"));
const logger_1 = __importDefault(require("./logger"));
const LeagueCron_1 = __importDefault(require("./Utils/LeagueCron"));
const DailyResetCron_1 = __importDefault(require("./Utils/DailyResetCron"));
const app = (0, express_1.default)();
function logResponseTime(req, res, next) {
    const startHrTime = process.hrtime();
    res.on('finish', () => {
        const elapsedHrTime = process.hrtime(startHrTime);
        const elapsedTimeInMs = elapsedHrTime[0] * 1000 + elapsedHrTime[1] / 1e6;
        const message = `${req.method} ${res.statusCode} ${elapsedTimeInMs}ms\t${req.path}`;
        logger_1.default.log({
            level: 'debug',
            message,
            consoleLoggerOptions: { label: 'API' },
        });
    });
    next();
}
app.use(logResponseTime);
app.use((0, compression_1.default)());
app.use(body_parser_1.default.json());
app.use(body_parser_1.default.urlencoded({ extended: true }));
app.use(express_1.default.static(path_1.default.join(__dirname, 'public'), { maxAge: 31557600000 }));
app.use(routes_1.default);
// League cron job
(0, LeagueCron_1.default)();
(0, DailyResetCron_1.default)();
app.use((err, req, res, next) => {
    if (res.headersSent) {
        return next(err);
    }
    return res.status(err.status || 500).json({
        error: err.message,
    });
});
exports.default = app;
