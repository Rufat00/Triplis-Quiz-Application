import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import HistoryService from '../../../../service/HistoryService'
import './main-logined.scss'

const Mainlogined = () => {

    const { currentUser } = useSelector(state=>state.user)
    const { received ,record } = useSelector(state=>state.history)

    const dispatch = useDispatch()
    
    useEffect(() => {
        if( received === false ){
            dispatch(HistoryService({alert: null, openBackdrop: null}).getHistory(currentUser.user.id))
        }
    }, [received]);

    const findTime = () => {
        if(record.time > 59){
            return `${Math.floor(record.time / 60)}min`
        }
        return `${record.time}sec`
    }

    return (
        <section className='main-logined block'>
            <div className="user">

                <Link to='/settings'>
                    <div className="avatar">
                        <img src={currentUser.user.avatar} alt='avatar'/>
                    </div>
                </Link>
                <h3>Game Record</h3>
                <div className="record">
                    <div className="filed">
                        <span className='filed-text'>{record.true}</span>
                        <span className='text'>Corrects</span>
                    </div>
                    <div className="filed">
                        <span className='filed-text'>{record.procent}%</span>
                        <span className='text'>Total</span>
                    </div>
                    <div className="filed">
                        <span className='filed-text'>{findTime()}</span>
                        <span className='text'>Time</span>
                    </div>
                </div>
            </div>
            <div className="buttons">
                <Link to="/settings"><button>Settings</button></Link>
                <Link to="/history"><button>View Play History</button></Link>
            </div>
        </section>
    );
}

export default Mainlogined;
