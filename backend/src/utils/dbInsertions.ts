import pool from '../config/db';

export const insertPDFInfoToDB = async (nom: string, prenom: string, date: string, chemin_fichier: string) => {
    try {
        await pool.query('INSERT INTO pdf_history (nom, prenom, date, chemin_fichier) VALUES ($1, $2, $3, $4)', [nom, prenom, date, chemin_fichier]);
    } catch (error) {
        console.error('Erreur lors de l\'insertion des informations dans la base de données :', error);
        throw error;
    }
};