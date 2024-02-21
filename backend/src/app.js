"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const pdfRoutes_1 = __importDefault(require("./routes/pdfRoutes"));
const morgan_1 = __importDefault(require("morgan"));
const path_1 = __importDefault(require("path"));
const app = (0, express_1.default)();
const PORT = process.env.PORT || 3000;
const pdfsDir = path_1.default.join(__dirname, 'pdfs');
app.use('/api/pdf', express_1.default.static(pdfsDir, {
    setHeaders: (res, path) => {
        if (path.endsWith('.pdf')) {
            res.setHeader('Content-Disposition', 'attachment');
        }
    }
}));
app.get('/api/pdf/:fileName', (req, res) => {
    const { fileName } = req.params;
    const filePath = path_1.default.join(pdfsDir, fileName);
    res.download(filePath); // res.download force le téléchargement
});
// Middleware pour parser le JSON
app.use(express_1.default.json());
// Middleware CORS pour permettre les requêtes cross-origin
app.use((0, cors_1.default)({
    methods: ['GET', 'POST', 'OPTIONS'],
    allowedHeaders: ['Content-Type'], // Assurez-vous d'autoriser les en-têtes nécessaires
}));
// Middleware de logging pour suivre les requêtes
app.use((0, morgan_1.default)('dev'));
// Routes pour la génération de PDF
app.use('/api/pdf', pdfRoutes_1.default);
// Middleware pour la gestion des erreurs
app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).send('Something broke!');
});
// Démarrage du serveur
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
