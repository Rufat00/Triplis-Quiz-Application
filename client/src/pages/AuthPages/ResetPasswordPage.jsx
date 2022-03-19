import React, { useState } from 'react';
import { Routes , Route, useNavigate } from 'react-router-dom';
import AuthService from '../../service/AuthService'
import Alert from '../../components/MainComponents/Alert/Alert'
import Backdrop from '../../components/MainComponents/Backdrop/Backdrop'
import useAlert from '../../components/MainComponents/Notification/useAlert'
import './auth.scss';
import ResetPasswordForm from '../../components/PageComponents/AuthPages/ResetPasswordForm';
import ActivationResetForm from '../../components/PageComponents/AuthPages/ActivationResetForm';
import { useDispatch, useSelector } from 'react-redux';

const ResetPasswordPage = () => {

    const [open , setOpen] = useState(false)
    const [alertProps, alert] = useAlert({})

    const [user, setUser] = useState({
        email: '',
        password: '',
        code: '',
    })

    const { isLogined } = useSelector(state=>state.user)
    const dispatch = useDispatch()

    const handleChange = (prop) => (event) => {
        setUser({ ...user, [prop]: event.target.value });
    };

    const navigate = useNavigate()

    const reset = () => {

        AuthService({openBackdrop:setOpen, alert}).reset({...user})
        .then(()=>{
            if(isLogined === true){
                dispatch(AuthService({openBackdrop:setOpen, alert}).logout())
            }
            navigate('/login')
        })
    }

    const sendCode = () => {

        AuthService({openBackdrop:setOpen, alert}).activationCode(user.email)

    }

    const next = () => {
 
        AuthService({openBackdrop:setOpen, alert}).activationCode(user.email)
        .then(()=>{
            navigate('/change-password/activation')
        })

    }

    return (
        <main className='auth-page'>
            <Routes>
                <Route path='/' element={
                    <ResetPasswordForm handleChange={handleChange} reset={next}/>
                } />
                <Route path='/activation' element={
                    <ActivationResetForm handleChange={handleChange} activate={reset} sendCode={sendCode}/>
                } />
            </Routes>
            <Alert {...alertProps}/>
            <Backdrop open={open}/>
        </main>
    );
}

export default ResetPasswordPage;
