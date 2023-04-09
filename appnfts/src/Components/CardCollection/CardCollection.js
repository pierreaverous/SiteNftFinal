import React from "react";
import magie from '../../Assets/img/1 Fehu.JPG';
import eau from '../../Assets/img/l arche de Noé.jpg';
import saison from '../../Assets/img/Automne.jpg';
import univers from '../../Assets/img/Les règles de l univers 2.jpg';
import ingwas from '../../Assets/img/22 Ingwas 1er.JPG';
import './CardCollectionStyles.scss';
import {Link} from "react-router-dom";



const CardCollection = () => {
    return(
        <>
            <div className='containerCard'>
                <div className='card'>
                    <Link  className='HeaderLink' to="/collection1">
                        <h2 className='titleCard'>Magie Celte</h2>
                        <img  className='cardHomePage' src={magie} alt='image'/>
                    </Link>
                </div>
                <div className='card'>
                    <Link  className='HeaderLink' to="/collection2">
                        <h2 className='titleCard'>L'Eau</h2>
                        <img  className='cardHomePage' src={eau} alt='image'/>
                    </Link>
                </div>
                <div className='card'>
                    <Link  className='HeaderLink' to="/collection4">
                        <h2 className='titleCard'>5 Saison</h2>
                        <img  className='cardHomePage' src={saison} alt='image'/>
                    </Link>
                </div>
                <div className='card'>
                    <Link  className='HeaderLink' to="/collection5">
                        <h2 className='titleCard'>Les regles de l'univers</h2>
                        <img  className='cardHomePage' src={univers} alt='image'/>
                    </Link>

                </div>
                <div className='card'>
                    <Link  className='HeaderLink' to="/collection3">
                        <h2 className='titleCard'>Ingwas</h2>
                        <img  className='cardHomePage' src={ingwas} alt='image'/>
                    </Link>

                </div>
            </div>
        </>
    )
}

export default CardCollection