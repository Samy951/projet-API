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
exports.insertPDFInfoToDB = void 0;
const db_1 = __importDefault(require("../config/db"));
const insertPDFInfoToDB = (nom, prenom, date, chemin_fichier) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        yield db_1.default.query('INSERT INTO pdf_history (nom, prenom, date, chemin_fichier) VALUES ($1, $2, $3, $4)', [nom, prenom, date, chemin_fichier]);
    }
    catch (error) {
        console.error('Erreur lors de l\'insertion des informations dans la base de données :', error);
        throw error;
    }
});
exports.insertPDFInfoToDB = insertPDFInfoToDB;
