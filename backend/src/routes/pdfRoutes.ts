import { Router } from 'express';
import { generatePdf } from '../controllers/pdfController';
import { Request, Response } from 'express';

const router = Router();

router.post('/generate', generatePdf);


import pool from '../config/db';


router.get('/history', async (req: Request, res: Response) => {
    try {
        const result = await pool.query('SELECT * FROM pdf_history');
        res.json(result.rows);
    } catch (error) {
        console.error('Erreur lors de la récupération de l\'historique des PDF :', error);
        res.status(500).send({ message: "Une erreur est survenue lors de la récupération de l'historique des PDF." });
    }
});

router.delete('/history/:id', async (req: Request, res: Response) => {
    const id = parseInt(req.params.id);
    try {
        await pool.query('DELETE FROM pdf_history WHERE id = $1', [id]);
        res.send(`Entrée historique avec l'id ${id} supprimée avec succès.`);
    } catch (error) {
        console.error('Erreur lors de la suppression de l\'entrée historique :', error);
        res.status(500).send({ message: "Une erreur est survenue lors de la suppression de l'entrée historique." });
    }
});

export default router;
