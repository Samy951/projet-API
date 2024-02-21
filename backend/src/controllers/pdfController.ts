import { Request, Response } from 'express';
import PDFDocument from 'pdfkit';
import fs from 'fs';
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
    const logoPath = path.join(__dirname,'..','images', 'logo.png'); // Ajustez le chemin vers votre logo
    doc.image(logoPath, 10, 30, { width: 200 }); // Ajustez selon la taille et le positionnement souhaités

    // Configurer le document PDF avec le texte spécifique
    doc.fontSize(12).text(`Garges-Lès-Gonesse, le ${req.body.date}`, 400, 200, { align: 'right' });

    // Texte de certification
    doc.fontSize(12).text(`Je soussigné ASGHARALI AKIL, docteur en medecine, certifie que l'état de santé de ${req.body.nom} ${req.body.prenom} nécessite un arrêt de ${req.body.duree} jours à compter du ${req.body.dateDebut}.`, 50, 300);

    // Signature en bas à droite
    const signaturePath = path.join(__dirname, '..','images', 'signature.png');
    doc.image(signaturePath, 400, 400, { width: 200 }); // Ajustez selon la taille et le positionnement souhaités

    // Finaliser le PDF
    doc.end();

    // Attendre la fin de l'écriture du fichier
    stream.on('finish', () => {
        console.log('Tentative d\'envoi du fichier PDF:', filePath);
        res.download(filePath, fileName, (err) => {
            if (err) {
                console.error('Erreur lors de l\'envoi du fichier PDF:', err);
                res.status(500).send({ message: "Une erreur est survenue lors du téléchargement du fichier." });
                return;
            }
            console.log('Fichier PDF envoyé avec succès:', fileName);
            // Suppression du fichier si désiré
            fs.unlink(filePath, (err) => {
                if (err) console.error('Erreur lors de la suppression du fichier:', err);
                else console.log('Fichier PDF supprimé avec succès.');
            });
        });
    });
};
