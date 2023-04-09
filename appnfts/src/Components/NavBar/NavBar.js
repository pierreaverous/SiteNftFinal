import React from "react";
import LogoRemy from '../../Assets/img/logo Rémi Bénard.png'
import {Link} from "react-router-dom";
import './NavBarStyles.scss'

import ConnectWalletButton from "../ConnectWallet/ConnectWallet.js";





const NavBar = () =>  {

    return(
        <>
            <div className='NavBar'>
                <img className='logo' src={LogoRemy} alt='Logo'/>
                <div className='containerLinkPage'>
                    <p className='plinkPage'>
                        <Link  className='HeaderLink' to="https://benardremi17.wixsite.com/remi-benard">Retour Site Web</Link>
                    </p>
                    <p className='plinkPage'>
                        <Link  className='HeaderLink' to="/">Acceuil</Link>
                    </p>
                    <ConnectWalletButton/>
                    {/*<p className='plinkPage'>*/}
                    {/*    <Link  className='HeaderLink' to="/collection1">Magie</Link>*/}
                    {/*</p>*/}
                    {/*<p className='plinkPage'>*/}
                    {/*    <Link className='HeaderLink' to="/collection2">L'eau</Link>*/}
                    {/*</p>*/}
                    {/*<p className='plinkPage'>*/}
                    {/*    <Link className='HeaderLink' to="/collection3">ING WAS</Link>*/}
                    {/*</p>*/}
                    {/*<p className='plinkPage'>*/}
                    {/*    <Link className='HeaderLink' to="/collection4">5 Saison</Link>*/}
                    {/*</p>*/}
                    {/*<p className='plinkPage'>*/}
                    {/*    <Link className='HeaderLink' to="/collection5">Univers</Link>*/}
                    {/*</p>*/}
                </div>
            </div>
        </>
    )
}

export default NavBar