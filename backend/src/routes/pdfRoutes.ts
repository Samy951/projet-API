import { Router } from 'express';
import { generatePdf } from '../controllers/pdfController';

const router = Router();

router.post('/generate', generatePdf);

export default router;
