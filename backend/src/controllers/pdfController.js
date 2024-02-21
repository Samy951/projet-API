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
exports.generatePdf = void 0;
const pdfkit_1 = __importDefault(require("pdfkit"));
const fs_1 = __importDefault(require("fs"));
const dbInsertions_1 = require("../utils/dbInsertions");
const path_1 = __importDefault(require("path"));
const generatePdf = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const doc = new pdfkit_1.default();
    const pdfsDir = path_1.default.join(__dirname, '..', 'pdfs');
    if (!fs_1.default.existsSync(pdfsDir)) {
        fs_1.default.mkdirSync(pdfsDir, { recursive: true });
    }
    const fileName = `Certificat_Maladie_${Date.now()}.pdf`;
    const filePath = path_1.default.join(pdfsDir, fileName);
    const stream = fs_1.default.createWriteStream(filePath);
    doc.pipe(stream);
    const logoPath = path_1.default.join(__dirname, '..', 'images', 'logo.png');
    doc.image(logoPath, 10, 30, { width: 200 });
    doc.fontSize(12).text(`Garges-Lès-Gonesse, le ${req.body.date}`, 400, 200, { align: 'right' });
    doc.fontSize(12).text(`Je soussigné ASGHARALI AKIL, docteur en medecine, certifie que l'état de santé de ${req.body.nom} ${req.body.prenom} nécessite un arrêt de ${req.body.duree} jours à compter du ${req.body.dateDebut}.`, 50, 300);
    const signaturePath = path_1.default.join(__dirname, '..', 'images', 'signature.png');
    doc.image(signaturePath, 400, 400, { width: 200 });
    doc.end();
    try {
        const { nom, prenom, date, duree, dateDebut } = req.body;
        const chemin_fichier = `/api/pdf/${fileName}`;
        yield (0, dbInsertions_1.insertPDFInfoToDB)(nom, prenom, date, chemin_fichier);
    }
    catch (error) {
        console.error('Erreur lors de l\'insertion des informations dans la base de données :', error);
        res.status(500).send('Erreur serveur');
        return;
    }
    stream.on('finish', () => {
        console.log('Tentative d\'envoi du fichier PDF:', filePath);
        res.download(filePath, fileName, (err) => {
            if (err) {
                console.error('Erreur lors de l\'envoi du fichier PDF:', err);
                res.status(500).send({ message: "Une erreur est survenue lors du téléchargement du fichier." });
                return;
            }
            console.log('Fichier PDF envoyé avec succès:', fileName);
            fs_1.default.unlink(filePath, (err) => {
                if (err)
                    console.error('Erreur lors de la suppression du fichier:', err);
                else
                    console.log('Fichier PDF supprimé avec succès.');
            });
        });
    });
});
exports.generatePdf = generatePdf;
