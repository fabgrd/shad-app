"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const swagger_ui_express_1 = __importDefault(require("swagger-ui-express"));
const openapi_json_1 = __importDefault(require("../openapi.json"));
const UserController = __importStar(require("./controllers/user"));
const RoutineController = __importStar(require("./controllers/routine"));
const RewardsController = __importStar(require("./controllers/rewards"));
const GoalsController = __importStar(require("./controllers/goals"));
const swaggerUiOptions = {
    customCss: '.swagger-ui .topbar { display: none }',
};
const router = (0, express_1.Router)();
// user routes
router.post('/user/register', UserController.register);
router.post('/user/login', UserController.login);
router.post('/user/refresh', UserController.refresh);
router.post('/user/', UserController.getUser);
// routine routes
router.post('/routine/add', RoutineController.addTasks);
router.delete('/routine/delete', RoutineController.removeTasks);
router.post('/routine/create', RoutineController.create);
router.get('/routine', RoutineController.get);
router.post('/routine/cheat', RoutineController.cheatDay);
router.post('/routine/check', RoutineController.checkTask);
// rewards routes
router.post('/rewards/', RewardsController.add);
router.get('/rewards/', RewardsController.get);
// goals routes
router.post('/goals/', GoalsController.add);
router.get('/goals/', GoalsController.get);
// Dev routes
if (process.env.NODE_ENV === 'development') {
    router.use('/dev/api-docs', swagger_ui_express_1.default.serve);
    router.get('/dev/api-docs', swagger_ui_express_1.default.setup(openapi_json_1.default, swaggerUiOptions));
}
exports.default = router;
