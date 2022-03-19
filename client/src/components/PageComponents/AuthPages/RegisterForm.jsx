import React from 'react';
import './auth-form.scss';
import logo from '../../../img/logo.png'
import { Link } from 'react-router-dom'

const RegisterForm = ({handleChange, registration}) => {


    return (
         <div className='auth-form'>
            <form onSubmit={(event)=> event.preventDefault()} >
                <div className="info">
                    <Link to='/'><img src={logo} alt="logo" /></Link>
                    <h3>Registration</h3>
                </div>
                <div className="input">
                    <label>Email</label>
                    <input type="text" onChange={handleChange('email')} className='form-input' minLength={5} maxLength={36}/>
                </div>
                <div className="input">
                    <label>Display Name</label>
                    <input type="text" onChange={handleChange('name')} className='form-input' autoComplete='off' minLength={3} maxLength={16}/>
                </div>
                <div className="input">
                    <label>Password</label>
                    <input type="password" name='password' onChange={handleChange('password')} className='form-input' autoComplete='off' minLength={5} maxLength={16}/>
                </div>
                <div className="submit">
                    <button onClick={registration}>Sign Up</button>
                </div>
                <div className="others">
                    <Link to='/login' className='link'>I have an account</Link>
                </div>
            </form>
        </div>
    );
}

export default RegisterForm;
