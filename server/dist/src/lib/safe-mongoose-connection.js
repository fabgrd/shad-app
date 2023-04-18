"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const defaultMongooseConnectionOptions = {
    autoCreate: true,
    autoIndex: true
};
/**
 * A Mongoose Connection wrapper class to
 * help with mongo connection issues.
 *
 * This library tries to auto-reconnect to
 * MongoDB without crashing the server.
 * @author Sidhant Panda
 */
class SafeMongooseConnection {
    /**
     * Start mongo connection
     * @param mongoUrl MongoDB URL
     * @param onConnectedCallback callback to be called when mongo connection is successful
     */
    constructor(options) {
        /**
         * Internal flag to check if connection established for
         * first time or after a disconnection
         */
        this.isConnectedBefore = false;
        this.shouldCloseConnection = false;
        /** Delay between retrying connecting to Mongo */
        this.retryDelayMs = 2000;
        /** Mongo connection options to be passed Mongoose */
        this.mongoConnectionOptions = defaultMongooseConnectionOptions;
        this.startConnection = () => {
            if (this.options.onStartConnection) {
                this.options.onStartConnection(this.options.mongoUrl);
            }
            mongoose_1.default.connect(this.options.mongoUrl, this.mongoConnectionOptions).catch(() => { });
        };
        /**
         * Handler called when mongo connection is established
         */
        this.onConnected = () => {
            var _a;
            this.isConnectedBefore = true;
            (_a = this.onConnectedCallback) === null || _a === void 0 ? void 0 : _a.call(this, this.options.mongoUrl);
        };
        /** Handler called when mongo gets re-connected to the database */
        this.onReconnected = () => {
            var _a;
            (_a = this.onConnectedCallback) === null || _a === void 0 ? void 0 : _a.call(this, this.options.mongoUrl);
        };
        /** Handler called for mongo connection errors */
        this.onError = () => {
            if (this.options.onConnectionError) {
                const error = new Error(`Could not connect to MongoDB at ${this.options.mongoUrl}`);
                this.options.onConnectionError(error, this.options.mongoUrl);
            }
        };
        /** Handler called when mongo connection is lost */
        this.onDisconnected = () => {
            if (!this.isConnectedBefore && !this.shouldCloseConnection) {
                this.connectionTimeout = setTimeout(() => {
                    this.startConnection();
                    this.connectionTimeout && clearTimeout(this.connectionTimeout);
                }, this.retryDelayMs);
                if (this.options.onConnectionRetry) {
                    this.options.onConnectionRetry(this.options.mongoUrl);
                }
            }
        };
        this.options = options;
        mongoose_1.default.connection.on('error', this.onError);
        mongoose_1.default.connection.on('connected', this.onConnected);
        mongoose_1.default.connection.on('disconnected', this.onDisconnected);
        mongoose_1.default.connection.on('reconnected', this.onReconnected);
        if (options.debugCallback) {
            mongoose_1.default.set('debug', options.debugCallback);
        }
        if (options.retryDelayMs) {
            this.retryDelayMs = options.retryDelayMs;
        }
    }
    /** Close mongo connection */
    close(onClosed = () => { }, force = false) {
        if (this.connectionTimeout) {
            clearTimeout(this.connectionTimeout);
        }
        this.shouldCloseConnection = true;
        mongoose_1.default.connection.close(force, onClosed);
    }
    /** Start mongo connection */
    connect(onConnectedCallback) {
        this.onConnectedCallback = onConnectedCallback;
        this.startConnection();
    }
}
exports.default = SafeMongooseConnection;
