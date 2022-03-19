import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import Header from '../../components/MainComponents/NavBar/Header'
import Dialog from '../../components/MainComponents/Dialog/Dialog';
import AuthService from '../../service/AuthService';
import EditIcon from '@mui/icons-material/Edit';
import CloseIcon from '@mui/icons-material/Close';
import AddPhotoAlternateIcon from '@mui/icons-material/AddPhotoAlternate';
import './settings-page.scss'
import useAlert from '../../components/MainComponents/Notification/useAlert';
import Alert from '../../components/MainComponents/Alert/Alert';
import Backdrop from '../../components/MainComponents/Backdrop/Backdrop';

const SettingsPage = () => {

    let user = useSelector(state=>state.user)
    user = user.currentUser.user

    const [name, setName] = useState(user.name)
    const [password, setPassword] = useState('')
    const [open , setOpen] = useState(false)
    const [alertProps, alert] = useAlert({})

    const dispatch = useDispatch()

    const logout = () => {
        dispatch(AuthService({openBackdrop: NaN , alert: NaN}).logout())
    }

    const [dialogOpen, setDialogOpen] = useState(false)

    const [passwordDialogOpen, setPasswordDialogOpen] = useState(false)

    const avatarChange = (e) => {

        const reader = new FileReader();
        reader.readAsDataURL(e.target.files[0]);
        setDialogOpen(false)
    
        reader.onloadend = () => {

            dispatch(AuthService({openBackdrop: setOpen , alert: alert}).uploadAvatar(user.id, reader.result))
        };
        
        e.target.value = ''
    }

    const changeName = () => {
        
        dispatch(AuthService({openBackdrop: setOpen , alert: alert}).changeName(user.id,name))
        
    }

    const deleteAccount = () => {
        AuthService({openBackdrop: setOpen , alert: alert}).deleteAccount(user.id, password)
        .then(()=>[
            logout()
        ])
    }

    return (
        <main className='settings-page'>
            <Header />
                <div className="settings-bar">
                    <div className="settings-header">
                        <div className="avatar">
                            <img src={user.avatar} alt='avatar'/>
                            <div className="edit-avatar" onClick={()=>setDialogOpen(true)}><EditIcon /></div>
                        </div>
                        <h2 className="name">
                            {user.name}
                        </h2>
                    </div>
                    <div className="settings-main">
                        <div className='input'>
                            <div>
                                <label>Display Name</label>
                                <input type="text" value={name} onChange={e=>setName(e.target.value)}/>
                            </div>
                            <div>
                                <button onClick={changeName}>Change</button>
                            </div>
                        </div>
                        <div className='input'>
                            <div>
                                <label>Email</label>
                                <input type="text" value={user.email} disabled/>
                            </div>
                        </div>
                        <div className='input'>
                            <div>
                                <label>Password</label>
                                <input type="password" value='0123456789' disabled/>
                            </div>
                            <div>
                                <Link to='/change-password'><button>Change</button></Link>
                            </div>
                        </div>
                    </div>
                    <div className="settings-footer">
                        <button onClick={logout}>Logout</button>
                        <button onClick={()=>setPasswordDialogOpen(true)}>Delete Account</button>
                    </div>

                </div>
                <Dialog open={dialogOpen} openFunc={setDialogOpen}>
                    <div className="avatar-settings">
                        <div className="avatar-settings-header">
                            Select the image
                            <CloseIcon onClick={()=>setDialogOpen(false)}/>
                        </div>
                        <div className="avatar-settings-main">

                            <input type="file" id='avatar' accept='image/*' onChange={avatarChange}/>
                            <label htmlFor="avatar">
                                <div><AddPhotoAlternateIcon /></div>
                            </label>

                        </div>
                    </div>
                </Dialog>
                <Dialog open={passwordDialogOpen} openFunc={setPasswordDialogOpen}>
                    <div className="delete-account">
                        <div className="delete-account-header">
                            Delete account permanently*
                            <CloseIcon onClick={()=>setPasswordDialogOpen(false)}/>
                        </div>
                        <div className="delete-account-main">
                            <div>
                                <label>Password</label>
                                <input type="password" onChange={e=>setPassword(e.target.value)}/>
                            </div>
                            <div>
                                <button onClick={deleteAccount}>Delete</button>
                            </div>
                        </div>
                    </div>
                </Dialog>
                <Alert {...alertProps}/>
                <Backdrop open={open}/>
        </main>
    );
}

export default SettingsPage;
