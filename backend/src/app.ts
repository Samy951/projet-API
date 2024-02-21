import express, { Request, Response, NextFunction, Express } from 'express';
import cors from 'cors';
import pdfRoutes from './routes/pdfRoutes';
import dotenv from 'dotenv';
import morgan from 'morgan';
import path from "path";


const app: Express = express();
const PORT: string | number = process.env.PORT || 3000;
const pdfsDir = path.join(__dirname, 'pdfs');
app.use('/api/pdf', express.static(pdfsDir, {
    setHeaders: (res, path) => {
        if (path.endsWith('.pdf')) {
            res.setHeader('Content-Disposition', 'attachment');
        }
    }
}));

app.get('/api/pdf/:fileName', (req, res) => {
    const { fileName } = req.params;
    const filePath = path.join(pdfsDir, fileName);
    res.download(filePath); // res.download force le téléchargement
});

// Middleware pour parser le JSON
app.use(express.json());

// Middleware CORS pour permettre les requêtes cross-origin
app.use(cors({
    methods: ['GET', 'POST', 'OPTIONS'],
    allowedHeaders: ['Content-Type'], // Assurez-vous d'autoriser les en-têtes nécessaires
}));


// Middleware de logging pour suivre les requêtes
app.use(morgan('dev'));

// Routes pour la génération de PDF
app.use('/api/pdf', pdfRoutes);

// Middleware pour la gestion des erreurs
app.use((err: Error, req: Request, res: Response, next: NextFunction) => {
    console.error(err.stack);
    res.status(500).send('Something broke!');
});

// Démarrage du serveur
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
