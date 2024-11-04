"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const TestLeague_1 = require("../Utils/TestLeague");
function runLeagueSystem() {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            yield mongoose_1.default.connect('https://81e6-163-5-23-109.ngrok-free.app');
            console.log('Creating mock leagues...');
            yield (0, TestLeague_1.createMockLeagues)();
            console.log('Processing promotions and relegations...');
            yield (0, TestLeague_1.processLeaguePromotionsRelegations)();
            console.log('League system test completed successfully');
        }
        catch (error) {
            console.error('Error running league system:', error);
        }
        finally {
            yield mongoose_1.default.connection.close();
        }
    });
}
runLeagueSystem();
