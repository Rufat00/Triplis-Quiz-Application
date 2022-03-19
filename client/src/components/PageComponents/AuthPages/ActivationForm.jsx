import React from 'react';
import './auth-form.scss';
import logo from '../../../img/logo.png'
import { Link } from 'react-router-dom'

const ActivationForm = ({handleChange, activate , sendCode}) => {

    return (
       <div className='auth-form'>
            <form onSubmit={(event)=> event.preventDefault()} >
                <div className="info">
                    <Link to='/'><img src={logo} alt="logo" /></Link>
                    <h3>Activation</h3>
                </div>
                <div className="input">
                    <label>Activation Code</label>
                    <input type="text" onChange={handleChange('code')} className='form-input' minLength={5} maxLength={8} autoComplete='off'/>
                </div>
                <div className="submit">
                    <button onClick={activate}>Sign Up</button>
                </div>
                <div className="others">
                    <div className="link" onClick={sendCode}>Send Again</div>
                </div>
            </form>
        </div>
    );
}

export default ActivationForm;
