import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { Routes , Route, useNavigate } from 'react-router-dom';
import AuthService from '../../service/AuthService'
import RegisterForm from '../../components/PageComponents/AuthPages/RegisterForm';
import Alert from '../../components/MainComponents/Alert/Alert'
import Backdrop from '../../components/MainComponents/Backdrop/Backdrop'
import useAlert from '../../components/MainComponents/Notification/useAlert'
import ActivationForm from '../../components/PageComponents/AuthPages/ActivationForm';
import './auth.scss';

const RegisterPage = () => {

    const [open , setOpen] = useState(false)
    const [alertProps, alert] = useAlert({})

    const [user, setUser] = useState({
        email: '',
        password: '',
        name: '',
        code: '',
    })

    const handleChange = (prop) => (event) => {
        setUser({ ...user, [prop]: event.target.value });
    };

    const navigate = useNavigate()
    const dispatch = useDispatch()

    const registration = () => {

        AuthService({openBackdrop:setOpen, alert}).registration({...user})
        .then(()=>{
            navigate('/registration/activation')
        })
    }

    const activate = () => {

        AuthService({openBackdrop:setOpen, alert}).activate({email: user.email,code: user.code })
        .then(()=>{
            dispatch(AuthService({openBackdrop:setOpen, alert}).login({email: user.email, password: user.password}))
        })
    }

    const sendCode = () => {

        AuthService({openBackdrop:setOpen, alert}).activationCode(user.email)

    }

    return (
        <main className='auth-page'>
            <Routes>
                <Route path='/' element={
                        <RegisterForm handleChange={handleChange} registration={registration}/>
                } />
                <Route path='/activation' element={
                    <ActivationForm handleChange={handleChange} activate={activate} sendCode={sendCode}/>
                } />
            </Routes>
            <Alert {...alertProps}/>
            <Backdrop open={open}/>
        </main>
    );
}

export default RegisterPage;
