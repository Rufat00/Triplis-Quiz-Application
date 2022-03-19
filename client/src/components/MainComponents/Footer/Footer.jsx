import React from 'react';
import logo from '../../../img/logo.png'
import GitHubIcon from '@mui/icons-material/GitHub';
import './footer.scss';

const Footer = () => {
    return (
        <footer className='footer'>
            <hr />
            <div className="block">
                <div className="logo">
                    <img src={logo} alt="logo" />
                    <h3>Triplis</h3>
                </div>
                <h4 className="text">
                    Copyright © 2022 Triplis <br />
                    Created by Rufat <a href="https://github.com/Rufat00" rel="noopener noreferrer" target="_blank"><GitHubIcon /></a>
                </h4>
            </div>
        </footer>
    );
}

export default Footer;
