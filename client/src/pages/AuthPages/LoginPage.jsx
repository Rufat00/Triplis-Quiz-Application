import React, { useState } from 'react';
import LoginForm from '../../components/PageComponents/AuthPages/LoginForm';
import Alert from '../../components/MainComponents/Alert/Alert'
import Backdrop from '../../components/MainComponents/Backdrop/Backdrop'
import useAlert from '../../components/MainComponents/Notification/useAlert'
import './auth.scss';

const LoginPage = () => {

    const [open , setOpen] = useState(false)
    const [alertProps, alert] = useAlert({})

    return (
        <main className='auth-page'>
            <LoginForm openBackdrop={setOpen} alert={alert}/>
            <Alert {...alertProps}/>
            <Backdrop open={open}/>
        </main>
    );
}

export default LoginPage;
