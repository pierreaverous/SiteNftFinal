# NftSite
Pour installer le projet par etape: 
1- forker le projet 
2- npm install dans le dossier hashlips
3- npm install dans le dossier appnfts
4- pour deployer le contrat : npx hardhat run .\scripts\deploy.js --network (nom du reseau exemple: sepolia)
5- config du reseaux dans hardhat.config.js ex:  networks:{
sepolia: {
url: "https://sepolia.infura.io/v3/chaineDeCaractere",
accounts: ['0x0000000000000000000000000000000000000000'] clé de votre compte
}
}
6-config deploiment contrat ex:  const SmartContrat = await hre.ethers.getContractFactory("Nomducontrat");
const smartcontrat = await Nomducontrat.deploy("nom collection", "nom du jeton", "ipfs://devotremetadonnéjsonsur pinata/");

await smartcontrat.deployed();

console.log("smartcontrat deployed to:", smartcontrat.address);
}

7-config de vos nft dans config.js
8-npm start poour lancer appnntfs sur localhost 