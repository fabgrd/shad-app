"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
var _a;
Object.defineProperty(exports, "__esModule", { value: true });
/* eslint-disable import/first */
const dotenv_1 = __importDefault(require("dotenv"));
const result = dotenv_1.default.config();
if (result.error) {
    dotenv_1.default.config({ path: '.env.default' });
}
const util_1 = __importDefault(require("util"));
const app_1 = __importDefault(require("./app"));
const safe_mongoose_connection_1 = __importDefault(require("./lib/safe-mongoose-connection"));
const logger_1 = __importDefault(require("./logger"));
const PORT = process.env.PORT || 3000;
let debugCallback;
if (process.env.NODE_ENV === 'development') {
    debugCallback = (collectionName, method, query, doc) => {
        const message = `${collectionName}.${method}(${util_1.default.inspect(query, { colors: true, depth: null })})`;
        logger_1.default.log({
            level: 'verbose',
            message,
            consoleLoggerOptions: { label: 'MONGO' }
        });
    };
}
const safeMongooseConnection = new safe_mongoose_connection_1.default({
    mongoUrl: (_a = process.env.MONGO_URL) !== null && _a !== void 0 ? _a : '',
    debugCallback,
    onStartConnection: mongoUrl => logger_1.default.info(`Connecting to MongoDB at ${mongoUrl}`),
    onConnectionError: (error, mongoUrl) => logger_1.default.log({
        level: 'error',
        message: `Could not connect to MongoDB at ${mongoUrl}`,
        error
    }),
    onConnectionRetry: mongoUrl => logger_1.default.info(`Retrying to MongoDB at ${mongoUrl}`)
});
const serve = () => app_1.default.listen(PORT, () => {
    logger_1.default.info(`🌏 Express server started at http://localhost:${PORT}`);
    if (process.env.NODE_ENV === 'development') {
        // This route is only present in development mode
        logger_1.default.info(`⚙️  Swagger UI hosted at http://localhost:${PORT}/dev/api-docs`);
    }
});
if (process.env.MONGO_URL == null) {
    logger_1.default.error('MONGO_URL not specified in environment', new Error('MONGO_URL not specified in environment'));
    process.exit(1);
}
else {
    safeMongooseConnection.connect(mongoUrl => {
        logger_1.default.info(`Connected to MongoDB at ${mongoUrl}`);
        serve();
    });
}
// Close the Mongoose connection, when receiving SIGINT
process.on('SIGINT', () => {
    console.log('\n'); /* eslint-disable-line */
    logger_1.default.info('Gracefully shutting down');
    logger_1.default.info('Closing the MongoDB connection');
    safeMongooseConnection.close(err => {
        if (err) {
            logger_1.default.log({
                level: 'error',
                message: 'Error shutting closing mongo connection',
                error: err
            });
        }
        else {
            logger_1.default.info('Mongo connection closed successfully');
        }
        process.exit(0);
    }, true);
});
