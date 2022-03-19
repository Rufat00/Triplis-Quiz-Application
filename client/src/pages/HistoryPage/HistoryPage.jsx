import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import HistoryService from '../../service/HistoryService'
import Header from '../../components/MainComponents/NavBar/Header';
import DeleteIcon from '@mui/icons-material/Delete';
import PlayCircleOutlineIcon from '@mui/icons-material/PlayCircleOutline';
import ReplayTwoToneIcon from '@mui/icons-material/ReplayTwoTone' 
import moment from 'moment';
import './history-page.scss'

const HistoryPage = () => {

    const { currentUser } = useSelector(state=>state.user)
    const { scores, received } = useSelector(state=>state.history)

    const dispatch = useDispatch()
    
    const getHistory = () => {
        dispatch(HistoryService({alert: null, openBackdrop: null}).getHistory(currentUser.user.id))
    }

    useEffect(() => {
        if( received === false ){
            getHistory()
        }
    }, [received]);

    const findTime = (time) => {
        if(time > 59){
            return `${Math.floor(time / 60)}min`
        }
        return `${time}sec`
    }

    const deleteHistory = (score) => {
        dispatch(HistoryService({alert: null, openBackdrop: null}).DeleteHistory(currentUser.user.id, score))
    }
    
    return (
        <main className='history-page'>
            <Header />
            <section className='history block'>
                <div className="reload">
                    <button onClick={getHistory}><ReplayTwoToneIcon /></button>
                </div>
                {
                    scores.length > 0? 
                    scores.map((element,i) => 
                        <div className='result' key={i}>
                            <div className="results">
                                <div>Corrects: {element.score.corrects}</div>
                                <div>Total time: {findTime(element.score.time)}</div>
                                <div>Procent: {element.score.procent}</div>
                            </div>
                            <div className="date">{moment(element.score.date).format("LL")}</div>
                            <div className="title">{element.title}</div>
                            <div className="options">
                                <Link to={`/quiz/${element.score.quiz}`}><button><PlayCircleOutlineIcon /></button></Link>
                                <button onClick={()=>deleteHistory(element.score._id)}><DeleteIcon /></button>
                            </div>
                        </div>    
                    ):
                    <div className='no-history'>History is empty...</div>
                }
            </section>
        </main>
    );
}

export default HistoryPage;
