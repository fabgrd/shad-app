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
exports.UpdateRoutineSchema = void 0;
const joi_1 = __importDefault(require("joi"));
const request_middleware_1 = __importDefault(require("../../middleware/request-middleware"));
const auth_middleware_1 = require("../../middleware/auth-middleware");
const Routine_1 = __importDefault(require("../../models/Routine"));
const User_1 = __importDefault(require("../../models/User"));
// Schéma de validation pour la mise à jour du deadline
exports.UpdateRoutineSchema = joi_1.default.object().keys({
    deadline: joi_1.default.date().iso().required(),
});
const updateRoutine = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    const { deadline } = req.body;
    try {
        // Trouver l'utilisateur actuel à partir du token
        const user = yield User_1.default.findOne({ _id: (_a = req === null || req === void 0 ? void 0 : req.user) === null || _a === void 0 ? void 0 : _a._id });
        if (!user) {
            return res.status(400).send({ error: 'User not found' });
        }
        // Trouver la routine associée à l'utilisateur
        const routine = yield Routine_1.default.findOne({ _id: user.routine._id });
        if (!routine) {
            return res.status(404).send({ error: 'Routine not found' });
        }
        // Mettre à jour le deadline de la routine
        // Convertir la chaîne de date en objet Date
        const newDeadline = new Date(deadline);
        routine.deadline = newDeadline;
        console.log("NEW DEADLINE BEFORE DB: ", newDeadline);
        yield routine.save();
        console.log('Updated routine in DB:', routine.deadline);
        // Récupérer la routine mise à jour depuis la base de données
        const updatedRoutine = yield Routine_1.default.findById(routine._id);
        console.log('Fetched updated routine from DB:', updatedRoutine === null || updatedRoutine === void 0 ? void 0 : updatedRoutine.deadline);
        res.send({
            message: 'Deadline updated successfully',
            routine: updatedRoutine,
            updatedUser: user,
        });
    }
    catch (error) {
        console.error('Error in updateRoutine controller:', error);
        res.status(500).send({ error: 'Internal Server Error' });
    }
});
// Appliquer les middlewares d'authentification et de validation de schéma
exports.default = (0, auth_middleware_1.authMiddleware)((0, request_middleware_1.default)(updateRoutine, { validation: { body: exports.UpdateRoutineSchema } }));
