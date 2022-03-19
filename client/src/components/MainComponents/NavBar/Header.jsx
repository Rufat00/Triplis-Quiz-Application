import React, { useState } from 'react';
import { Link } from 'react-router-dom'
import HomeRoundedIcon from '@mui/icons-material/HomeRounded';
import ExtensionIcon from '@mui/icons-material/Extension';
import HandymanIcon from '@mui/icons-material/Handyman';
import PersonIcon from '@mui/icons-material/Person';
import SettingsIcon from '@mui/icons-material/Settings';
import AccessTimeIcon from '@mui/icons-material/AccessTime'
import LogoutIcon from '@mui/icons-material/Logout';
import './header.scss';
import logo from '../../../img/logo.png'
import { useSelector, useDispatch } from 'react-redux';
import AuthService from '../../../service/AuthService';

const Header = () => {

    const  user = useSelector(state=> state.user)
    const dispatch = useDispatch()

    const [menu, setMenu] = useState('')

    const toggleMenu = () => {
        if(menu === ''){
            return setMenu('open')
        }
        setMenu('')
    }

    const logout = () => {
        dispatch(AuthService({openBackdrop: NaN , alert: NaN}).logout())
    }

    return (
        <header className={`nav-bar ${
            user.isLogined === true? 'logined' : ''
        }`}>
            <nav className="full-block">
                <Link to='/'>
                    <div className="logo">
                         <img src={logo} alt="logo" />
                        <h3>Triplis</h3>
                    </div>
                </Link>
                <ul className="actions">
                    <li><Link to='/' ><HomeRoundedIcon/><span>Main</span></Link></li>
                    <li><Link to='/play' ><ExtensionIcon/><span>Play</span></Link></li>
                    <li><Link to='/studio' ><HandymanIcon/><span>Studio</span></Link></li>
                </ul>
                <div className="user">
                    {
                        user.isLogined === true?
                            <><div className="avatar" onClick={toggleMenu}><img src={user.currentUser.user.avatar} alt="avatar" /></div>
                            
                            <div className={`list ${menu}`}>
                                <div className="list-option list-header"><PersonIcon />{user.currentUser.user.name}</div>
                                <Link to='/settings'><div className='list-option'><SettingsIcon/>Settings</div></Link>
                                <Link to='/history'><div className='list-option'><AccessTimeIcon/>History</div></Link>
                                <div className='list-option' onClick={logout}><LogoutIcon/>Logout</div>
                            </div></>

                            : 
                            <Link to='/login'><button className='filled-button'>Log In</button></Link>
                    }
                </div>
            </nav>
        </header>
    );
}

export default Header;