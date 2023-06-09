
import { useEffect, useState } from 'react';
import { ethers } from 'ethers';
import SmartContrat from '../../artifacts/contracts/SmartContrat.sol/SmartContrat.json';
import './CollectionsStyles.scss';
import dataNft from '../../JSON/MagieCelteJson/CollectionMagieCelteMetaDonnés.json';
import NavBar from "../../Components/NavBar/NavBar";
import {useMinted} from "../../MintedContext";


const smartcontratAdress = '0xCc7f25A5Ee8a611b3931cF52C5B69956D5Aa9F64';

const checkMintedStatus = async (setMinted) => {
  const provider = new ethers.providers.Web3Provider(window.ethereum);
  const contract = new ethers.Contract(smartcontratAdress, SmartContrat.abi, provider);

  const updatedMintedStatus = {};
  for (const nft of dataNft) {
    try {
      await contract.ownerOf(nft.edition);
      updatedMintedStatus[nft.edition] = true;
    } catch (error) {
      updatedMintedStatus[nft.edition] = false;
    }
  }
  setMinted(updatedMintedStatus);
};

const setNftSpecificPrice = async (edition, newPrice, fetchData, setError) => {
  if (typeof window.ethereum !== 'undefined') {
    try {
      const accounts = await window.ethereum.request({ method: 'eth_requestAccounts' });
      const provider = new ethers.providers.Web3Provider(window.ethereum);
      const signer = provider.getSigner();
      const contract = new ethers.Contract(smartcontratAdress, SmartContrat.abi, signer);
      const transaction = await contract.setNftSpecificPrice(edition, ethers.utils.parseEther(newPrice));
      await transaction.wait();
      fetchData();
    } catch (err) {
      setError(err.message);
    }
  }
};

const setCost = async (newCost, fetchData, setError) => {
  if (typeof window.ethereum !== 'undefined') {
    try {
      const accounts = await window.ethereum.request({method: 'eth_requestAccounts'});
      const provider = new ethers.providers.Web3Provider(window.ethereum);
      const signer = provider.getSigner();
      const contract = new ethers.Contract(smartcontratAdress, SmartContrat.abi, signer);
      const overrides = {
        from: accounts[0],
        gasLimit: 2900000,
      };
      const transaction = await contract.setCost(ethers.utils.parseEther(newCost), overrides);
      await transaction.wait();
      fetchData();
    } catch (err) {
      setError(err.message);
    }
  }
};

const NFTCard = ({ nft, mintFunction, setPriceFunction, fetchData, setError, account }) => {
  const isOwner = account[0] === "0x1bdd1c5a567ab35dcaa896799dbdac6ac94c35b4";

  const { minted, setMinted } = useMinted();
  const isMinted = minted[nft.edition] || false;

  const handleMintClick = async () => {
    try {
      await mintFunction(nft.edition);
      setMinted({ ...minted, [nft.edition]: true });
    } catch (err) {
      console.error(err);
    }
  };

  return (
      <div className="nft-card">
        <h2>{nft.name}</h2>
        <img
            className="nftImage"
            src={nft.image.replace("ipfs://", "https://ipfs.io/ipfs/")}
            alt={nft.name}
        />
        {/*<button onClick={() => handleMintClick(nft.edition)} disabled={isMinted}>*/}
        {/*  {isMinted ? "Minted" : "Mint"}*/}
        {/*</button>*/}
        {account[0] === "0x1bdd1c5a567ab35dcaa896799dbdac6ac94c35b4" && (
            <form
                onSubmit={(e) => {
                  e.preventDefault();
                  setNftSpecificPrice(nft.edition, e.target.newPrice.value, fetchData, setError);
                }}
            >
              <input
                  type="number"
                  step="0.01"
                  name="newPrice"
                  placeholder="New specific price"
                  required
              />
              <button type="submit">Set specific price</button>
            </form>
        )}
      </div>
  );
};

const PageCollection1 = () => {
  const [error, setError] = useState('');
  const [account, setAccount] = useState([]);
  const [nftData, setNftData] = useState([]);
  const [isMinted, setIsMinted] = useState(false);
  const { minted, setMinted } = useMinted();
  const [targetAddresses, setTargetAddresses] = useState({});
  const [data, setData] = useState({ cost: '', totalSupply: '', maxSupply: '' });




  useEffect(() => {
    const ethereum = window.ethereum;
    if (ethereum) {
      ethereum.request({ method: 'eth_chainId' }).then((chainId) => {
        // Vérifier si l'utilisateur est connecté au bon réseau
        if (chainId !== '0x1') { // Vérifier si le réseau actuel est Ethereum mainnet
          // Si l'utilisateur n'est pas connecté au bon réseau, demandez-lui de changer de réseau
          ethereum.request({ method: 'wallet_switchEthereumChain', params: [{ chainId: '0x1' }] }).catch((err) => {
            console.error(err);
          });
        }
      });
    }
    checkMintedStatus(setMinted)
    fetchData();
    getAccounts();
    setNftData(dataNft);
    setTargetAddresses({
      1: '0x1BDd1c5a567aB35dcAA896799DBdAC6ac94c35b4',
      5: '0x1BDd1c5a567aB35dcAA896799DBdAC6ac94c35b4',
      // Ajoutez d'autres paires d'identifiants de token et d'adresses ici
    });
    console.log(setTargetAddresses)

  }, []);

  const getAccounts = async () => {
    if (typeof window.ethereum !== 'undefined') {
      try {
        const accounts = await window.ethereum.request({method: 'eth_requestAccounts'});
        setAccount(accounts);
        console.log(accounts[0]);
      } catch (err) {
        setError(err.message);
      }
    }
  };

  const fetchData = async () => {
    if (typeof window.ethereum !== 'undefined') {
      const provider = new ethers.providers.Web3Provider(window.ethereum);
      const contract = new ethers.Contract(smartcontratAdress, SmartContrat.abi, provider);
      try {
        const cost = await contract.cost();
        const totalSupply = await contract.totalSupply();
        const maxSupply = await contract.maxSupply(); // Ajoutez cette ligne pour récupérer la valeur maxSupply
        const object = { cost: String(cost), totalSupply: String(totalSupply), maxSupply: String(maxSupply) }; // Incluez maxSupply dans l'objet
        setData(object);
      } catch (err) {
        setError(err.message);
      }
    }
  };

  async function mint(edition) {
    if (typeof window.ethereum !== "undefined") {
      try {
        const accounts = await window.ethereum.request({
          method: "eth_requestAccounts",
        });
        const provider = new ethers.providers.Web3Provider(window.ethereum);
        const signer = provider.getSigner();
        const contract = new ethers.Contract(
            smartcontratAdress,
            SmartContrat.abi,
            signer
        );

        // Récupérez le prix spécifique de l'édition NFT
        const specificPrice = await contract.nftPrices(edition);
        const priceToUse = specificPrice.gt(0) ? specificPrice : data.cost;

        const overrides = {
          from: accounts[0],
          value: priceToUse,
          gasLimit: 9900000,
        };
        const transaction = await contract.mint(accounts[0], edition, overrides);

        const receipt = await transaction.wait();
        fetchData();
        return receipt;
      } catch (err) {
        setError(err.message);
        throw err;
      }
    }
  }

  async function withdraw() {
    if (typeof window.ethereum !== 'undefined') {
      try {
        const accounts = await window.ethereum.request({method: 'eth_requestAccounts'});
        const provider = new ethers.providers.Web3Provider(window.ethereum);
        const signer = provider.getSigner();
        const contract = new ethers.Contract(smartcontratAdress, SmartContrat.abi, signer);
        const transaction = await contract.withdraw();
        await transaction.wait();
        fetchData();
      } catch (err) {
        setError(err.message);
      }
    }
  }

  return (
      <>
        <NavBar/>
        <div className="App">
          <div className='h2Container'>
            <h2 className='titleh2'>The NFT collection Magie-Celte will be available soon. The pre-sales are open, you can contact the artist, Remi Benard on instagram by indicating the name of the painting and the amount in eth that you want to offer him  -->  remibenard17</h2>
          </div>
          <div className="container">
            <div className="nft-gallery">
              {/*{nftData.map((nft) => {*/}
              {/*  if  (window.ethereum.selectedAddress &&*/}
              {/*      targetAddresses[nft.edition] &&*/}
              {/*      window.ethereum.selectedAddress.toLowerCase() === targetAddresses[nft.edition].toLowerCase()) {*/}
              {/*    return (*/}
              {/*        <NFTCard*/}
              {/*            key={nft.edition}*/}
              {/*            nft={nft}*/}
              {/*            mintFunction={mint}*/}
              {/*            fetchData={fetchData}*/}
              {/*            setError={setError}*/}
              {/*            account={account}*/}
              {/*            setIsMinted={setIsMinted}*/}
              {/*        />*/}
              {/*    );*/}
              {/*  }else if (account[0] === "0x0ca22262c953bf13f89be2e1ff1742f9d227b18c") {*/}
              {/*    return (*/}
              {/*        <NFTCard*/}
              {/*            key={nft.edition}*/}
              {/*            nft={nft}*/}
              {/*            mintFunction={mint}*/}
              {/*            fetchData={fetchData}*/}
              {/*            setError={setError}*/}
              {/*            account={account}*/}
              {/*            setIsMinted={setIsMinted}*/}
              {/*        />*/}
              {/*    );*/}
              {/*  }*/}
              {/*  return null;*/}

              {/*})}*/}
              {nftData.map((nft) => (
                  <NFTCard
                      key={nft.edition}
                      nft={nft}
                      mintFunction={mint}
                      fetchData={fetchData}
                      setError={setError}
                      account={account}
                      setIsMinted={setIsMinted}
                  />
              ))}
            </div>
            <p className="count">
              {data.totalSupply}/{data.maxSupply}
            </p>
            {account[0] === "0x1bdd1c5a567ab35dcaa896799dbdac6ac94c35b4" && (
                <form onSubmit={(e) => {
                  e.preventDefault();
                  setCost(e.target.cost.value, fetchData, setError);
                }}>
                  <input type="number" step="0.01" name="cost" placeholder="New cost" required />
                  <button type="submit">Set cost</button>
                </form>
            )}
            <p className="cost">
              Collection NFT cost {Number(data.cost) / 10 ** 18} ETH (excluding gas fees)
            </p>
            {account[0] === "0x1bdd1c5a567ab35dcaa896799dbdac6ac94c35b4" && (
                <button className="withdraw" onClick={withdraw}>
                  Withdraw
                </button>
            )}
          </div>
        </div>
      </>

  );
}
export default PageCollection1;
