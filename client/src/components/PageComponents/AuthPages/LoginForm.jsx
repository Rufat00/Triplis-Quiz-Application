import React, { useState } from 'react';
import './auth-form.scss';
import logo from '../../../img/logo.png';
import { Link } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import AuthService from '../../../service/AuthService'

const LoginForm = ({openBackdrop, alert}) => {

    const [user, setUser] = useState({
        email: '',
        password: '',
    })

    const handleChange = (prop) => (event) => {
        setUser({ ...user, [prop]: event.target.value });
    };

    const dispatch = useDispatch()

    const login = () => {
        dispatch(AuthService({openBackdrop, alert}).login({...user}))
    }
    
    return (
        <div className='auth-form'>
           <form onSubmit={(event)=> event.preventDefault()} >
               <div className="info">
                   <Link to='/'><img src={logo} alt="logo" /></Link>
                   <h3>Loging</h3>
               </div>
               <div className="input">
                   <label>Email</label>
                   <input type="text" onChange={handleChange('email')} className='form-input' minLength={5} maxLength={36}/>
               </div>
               <div className="input">
                   <label>
                       Password
                       <Link to='/change-password' className='link'>Forgot your password?</Link>
                    </label>
                   <input type="password" onChange={handleChange('password')} className='form-input' autoComplete='off' minLength={5} maxLength={16}/>
               </div>
               <div className="submit">
                   <button onClick={login}>Log In</button>
               </div>
               <div className="others">
                    <Link to='/registration' className='link'>Create new account</Link>
               </div>
           </form>
       </div>
   );
}

export default LoginForm;
