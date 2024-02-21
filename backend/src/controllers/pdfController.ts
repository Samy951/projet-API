import { Request, Response } from 'express';
import PDFDocument from 'pdfkit';
import fs from 'fs';
import { insertPDFInfoToDB } from '../utils/dbInsertions';
import path from 'path';

export const generatePdf = async (req: Request, res: Response) => {
    const doc = new PDFDocument();
    const pdfsDir = path.join(__dirname, '..', 'pdfs');

    if (!fs.existsSync(pdfsDir)){
        fs.mkdirSync(pdfsDir, { recursive: true });
    }

    const fileName = `Certificat_Maladie_${Date.now()}.pdf`;
    const filePath = path.join(pdfsDir, fileName);
    const stream = fs.createWriteStream(filePath);

    doc.pipe(stream);
    const logoPath = path.join(__dirname,'..','images', 'logo.png');
    doc.image(logoPath, 10, 30, { width: 200 });

    doc.fontSize(12).text(`Garges-Lès-Gonesse, le ${req.body.date}`, 400, 200, { align: 'right' });


    doc.fontSize(12).text(`Je soussigné ASGHARALI AKIL, docteur en medecine, certifie que l'état de santé de ${req.body.nom} ${req.body.prenom} nécessite un arrêt de ${req.body.duree} jours à compter du ${req.body.dateDebut}.`, 50, 300);


    const signaturePath = path.join(__dirname, '..','images', 'signature.png');
    doc.image(signaturePath, 400, 400, { width: 200 });


    doc.end();


    try {
        const { nom, prenom, date, duree, dateDebut } = req.body;
        const chemin_fichier = `/api/pdf/${fileName}`;
        await insertPDFInfoToDB(nom, prenom, date, chemin_fichier);
    } catch (error) {
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
            fs.unlink(filePath, (err) => {
                if (err) console.error('Erreur lors de la suppression du fichier:', err);
                else console.log('Fichier PDF supprimé avec succès.');
            });
        });
    });
};
