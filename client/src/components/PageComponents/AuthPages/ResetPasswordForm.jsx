import React from 'react';
import './auth-form.scss';
import logo from '../../../img/logo.png';
import { Link } from 'react-router-dom';

const ResetPasswordForm = ({handleChange, reset}) => {
    return (
        <div className='auth-form'>
           <form onSubmit={(event)=> event.preventDefault()} >
               <div className="info">
                   <Link to='/'><img src={logo} alt="logo" /></Link>
                   <h3>New Password</h3>
               </div>
               <div className="input">
                   <label>Email</label>
                   <input type="text" onChange={handleChange('email')} className='form-input' minLength={5} maxLength={36}/>
               </div>
               <div className="input">
                   <label>New Password</label>
                   <input type="password" onChange={handleChange('password')} className='form-input' autoComplete='off' minLength={5} maxLength={16}/>
               </div>
               <div className="submit">
                   <button onClick={reset}>Next</button>
               </div>
               <div className="others">
                   <Link to='/support' className='link'>if you have problems - support</Link>
               </div>
           </form>
       </div>
   );
}

export default ResetPasswordForm;
