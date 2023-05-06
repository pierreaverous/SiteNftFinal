const axios = require('axios');

async function updateMetadataOnOpenSea(contractAddress, tokenId) {
    try {
        const response = await axios.post('https://testnets-api.opensea.io/asset/' + contractAddress + '/' + tokenId + '/?format=json', {
            headers: {
                'Content-Type': 'application/json',
                'X-API-KEY': 'votre_clé_api_opensea'
            }
        });
        console.log('Mise à jour réussie:', response.data);
    } catch (error) {
        console.error('Erreur lors de la mise à jour des métadonnées:', error);
    }
}

// Exemple d'utilisation :
const contractAddress = 'votre_adresse_de_contrat';
const tokenId = '1'; // Changez cela pour le Token ID que vous souhaitez mettre à jour
updateMetadataOnOpenSea(contractAddress, tokenId);
