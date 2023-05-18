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
                    <div className='linkPageNav'>
                        <p className='plinkPage'>
                            <Link  className='HeaderLink' to="https://benardremi17.wixsite.com/remi-benard">Return WebSite</Link>
                        </p>
                        <p className='plinkPage'>
                            <Link  className='HeaderLink' to="/">Home</Link>
                        </p>
                    </div>
                    <ConnectWalletButton/>
                </div>
            </div>
        </>
    )
}

export default NavBar