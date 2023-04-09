import { useEffect, useState } from 'react';
import { ethers } from 'ethers';
import SmartContrat from './artifacts/contracts/SmartContrat.sol/SmartContrat.json'
import './CollectionsStyles.scss';
import img1 from './img/1.png'
import img2 from './img/2.png'
import img3 from './img/3.png'
import img4 from './img/4.png'
import img5 from './img/5.png'
import img6 from './img/6.png'
import img7 from './img/7.png'
import img8 from './img/8.png'
import img9 from './img/9.png'
import img10 from './img/10.png'




const smartcontratAdress = '0x7D0909d43406c4439E96f528F98253c6610A557F'
function Collection1() {
  const [error, setErorr] = useState('');
  const [data, setData] = useState({})
    useEffect(()=>{
      fetchData();
    })

  async function fetchData(){
    if(typeof window.ethereum !== 'undefined'){
      const provider = new ethers.providers.Web3Provider(window.ethereum)
      const contract = new ethers.Contract(smartcontratAdress, SmartContrat.abi, provider);
      try{
        const cost = await contract.cost();
        const totalSupply = await contract.totalSupply();
        const object = {"cost": String(cost), "totalSupply": String(totalSupply)}
        setData(object);
      }
      catch(err){
        setErorr(err.message)
      }
    }
  }

  async function mint(){
    if(typeof window.ethereum !== 'undefined'){
      let accounts = await window.ethereum.request({method: 'eth_requestAccounts' });
      const provider = new ethers.providers.Web3Provider(window.ethereum);
      const signer = provider.getSigner();
      const contrat = new ethers.Contract(smartcontratAdress, SmartContrat.abi, signer );
      try{
        let overrides = {
          from: accounts[0],
          value: data.cost
        }
          const transaction = await contrat.mint(accounts[0], 1, overrides);
          await transaction.wait();
          fetchData();
      }catch(err){
        setErorr(err.message)
      }
    }

  }


  return (
    <div className="App">
     <div className='container'>
      <div className='banniere'>
        <img src={img1} alt='img'/>
        <img src={img2} alt='img'/>
        <img src={img3} alt='img'/>
        <img src={img4} alt='img'/>
        <img src={img5} alt='img'/>
        <img src={img6} alt='img'/>
        <img src={img7} alt='img'/>
        <img src={img8} alt='img'/>
        <img src={img9} alt='img'/>
        <img src={img10} alt='img'/>
      </div>
      {error && <p>{error}</p>}
      <h1> Mint a jox NFT</h1>
      <p className='count'>{data.totalSupply}/50</p>
      <p className='cost'>jox collection nft cost {data.cost / 10**18} eth (excluding gas fees)</p>
      <button onClick={mint}> Buy one jox nft </button>
     </div>
    </div>
  );
}

export default App;
