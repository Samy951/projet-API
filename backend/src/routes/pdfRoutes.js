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
const express_1 = require("express");
const pdfController_1 = require("../controllers/pdfController");
const router = (0, express_1.Router)();
router.post('/generate', pdfController_1.generatePdf);
const db_1 = __importDefault(require("../config/db"));
router.get('/history', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const result = yield db_1.default.query('SELECT * FROM pdf_history');
        res.json(result.rows);
    }
    catch (error) {
        console.error('Erreur lors de la récupération de l\'historique des PDF :', error);
        res.status(500).send({ message: "Une erreur est survenue lors de la récupération de l'historique des PDF." });
    }
}));
router.delete('/history/:id', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const id = parseInt(req.params.id);
    try {
        yield db_1.default.query('DELETE FROM pdf_history WHERE id = $1', [id]);
        res.send(`Entrée historique avec l'id ${id} supprimée avec succès.`);
    }
    catch (error) {
        console.error('Erreur lors de la suppression de l\'entrée historique :', error);
        res.status(500).send({ message: "Une erreur est survenue lors de la suppression de l'entrée historique." });
    }
}));
exports.default = router;
