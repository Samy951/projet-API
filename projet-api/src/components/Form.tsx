import React, { useState } from 'react';

interface FormData {
    nom: string;
    prenom: string;
    date: string;
    duree: string;
    dateDebut: string;
}

function PdfForm() {
    const generatePdf = async (data: FormData) => {
        try {
            const response = await fetch('http://localhost:3000/api/pdf/generate', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(data),
            });
            if (!response.ok) throw new Error('Erreur de réseau');


            if (response.headers.get("Content-Type")?.includes("application/pdf")) {

                const blob = await response.blob();
                const downloadUrl = window.URL.createObjectURL(blob);


                const a = document.createElement("a");
                document.body.appendChild(a);
                a.style.display = "none";
                a.href = downloadUrl;
                a.download = "certificat_maladie.pdf"; // Vous pouvez spécifier le nom du fichier ici
                a.click();


                window.URL.revokeObjectURL(downloadUrl);
                document.body.removeChild(a);
            } else {
                console.error("Réponse inattendue du serveur");
            }
        } catch (error) {
            console.error("Erreur lors de la génération du PDF :", error);
        }
    };



    const [formData, setFormData] = useState<FormData>({
        nom: '',
        prenom: '',
        date: '',
        duree: '',
        dateDebut: '',
    });

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setFormData(prevState => ({
            ...prevState,
            [name]: value,
        }));
    };

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        try {
            await generatePdf(formData);
        } catch (error) {
            console.error("Erreur lors de la soumission du formulaire :", error);
        }
    };

    return (
            <form onSubmit={handleSubmit} className={"flex gap-y-2 m-auto flex-col"}>
            <div className={"flex gap-4 justify-between"}>
                <label htmlFor="nom">Nom</label>
                <input
                    className={"border-2 border-gray-300"}
                    type="text"
                    id="nom"
                    name="nom"
                    value={formData.nom}
                    onChange={handleChange}
                />
            </div>
            <div className={"flex gap-4 justify-between"}>
                <label htmlFor="prenom">Prénom</label>
                <input
                    className={"border-2 border-gray-300"}
                    type="text"
                    id="prenom"
                    name="prenom"
                    value={formData.prenom}
                    onChange={handleChange}
                />
            </div>
            <div className={"flex gap-4 justify-around"}>
                <label htmlFor="date">Date</label>
                <input
                    className={"border-2 border-gray-300"}
                    type="date"
                    id="date"
                    name="date"
                    value={formData.date}
                    onChange={handleChange}
                />
            </div>
            <div className={"flex gap-4 justify-between"}>
                <label htmlFor="duree">Durée</label>
                <input
                    className={"border-2 border-gray-300"}
                    type="number"
                    id="duree"
                    name="duree"
                    value={formData.duree}
                    onChange={handleChange}
                />
            </div>
            <div className={"flex gap-4 justify-between"}>
                <label htmlFor="dateDebut">Date de début</label>
                <input
                    className={"border-2 border-gray-300"}
                    type="date"
                    id="dateDebut"
                    name="dateDebut"
                    value={formData.dateDebut}
                    onChange={handleChange}
                />
            </div>
            <button
                className="bg-gray-300 hover:bg-gray-400 text-gray-800 font-bold py-2 px-4 rounded inline-flex items-center justify-center">
                <svg className="fill-current w-4 h-4 mr-2" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20">
                    <path d="M13 8V2H7v6H2l8 8 8-8h-5zM0 18h20v2H0v-2z"/>
                </svg>
                <span >Générer PDF</span>
            </button>
        </form>
    );
}

export default PdfForm;