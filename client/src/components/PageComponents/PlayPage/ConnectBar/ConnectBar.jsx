import React, { useState } from 'react';
import './connect-bar.scss';
import PlayService from '../../../../service/PlayService';
import { useNavigate } from 'react-router-dom'

const ConnectBar = () => {

    const [pin, setPin] = useState('')
    const navigate = useNavigate()

    const connect = async () => {
        await PlayService({openBackdrop: NaN, alert: NaN}).connect(pin)
        .then(response=>{
            navigate(`/quiz/${response.data}`)
        })
    }

    return (
        <div className='connect-bar'>
            <form className="main full-block" onSubmit={(event)=> event.preventDefault()}>
                <div>
                    <input type="text" maxLength={8} placeholder="pin code" value={pin} onChange={e=>setPin(e.target.value)}/>
                </div>
                <div>
                    <button onClick={connect}>Connect</button>
                </div>
            </form>
        </div>
    );
}

export default ConnectBar;
