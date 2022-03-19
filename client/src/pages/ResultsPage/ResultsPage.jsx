import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom';
import ThumbUpAltIcon from '@mui/icons-material/ThumbUpAlt';
import ThumbDownIcon from '@mui/icons-material/ThumbDown';
import Header from '../../components/MainComponents/NavBar/Header'
import playService from '../../service/PlayService';
import HistoryService from '../../service/HistoryService'
import './results-page.scss'
import Backdrop from '../../components/MainComponents/Backdrop/Backdrop';

const ResultsPage = () => {

    const {currentUser} = useSelector(state=>state.user)
    const {results} = useSelector(state=>state.quiz)
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const [grade, setGrade] = useState(null)
    const [openBackdrop , setOpenBackdrop] = useState(false)

    const {count,id} = useParams()

    const findTotal = () => {
        return Math.floor((results.corrects * 100) / count)
    }
    const findTime = () => {
        if(results.time > 59){
            return `${Math.floor(results.time / 60)}min`
        }
        return `${results.time}sec`
    }
    
    const sendResults = async () => {
        await dispatch(playService({alert: NaN,openBackdrop: setOpenBackdrop}).sendResults({
            id: currentUser.user.id,
            results: {
                ...results,
                procent: findTotal()
            },
            grade: {
                id: id,
                type: grade
            }
        }))
        .then(()=>{
            dispatch(HistoryService({alert: null, openBackdrop: null}).getHistory(currentUser.user.id))
        })
        .then(()=>{
            navigate('/')
        })
    }

    return (
        <main className='results-page'>
            <Header />
            <div className="block">
                <div className="info">
                    <div className="user">
                        <div className="avatar"><img src={currentUser.user.avatar} alt="avatar" /></div>
                        <div className="name">{currentUser.user.name}</div>
                    </div>
                    <div className="results">
                        <div className="result">
                            <span className='result-text'>{results.corrects}</span>
                            <span className='text'>Corrects</span>
                        </div>
                        <div className="result">
                            <span className='result-text'>{findTotal()}%</span>
                            <span className='text'>Total</span>
                        </div>
                        <div className="result">
                            <span className='result-text'>{findTime()}</span>
                            <span className='text'>Time</span>
                        </div>
                    </div>
                </div>
                <div className="grades block">
                    {
                        grade === null ? <>
                            <div>
                                <input type="radio" name='grade' id='like' onChange={()=>setGrade('like')}/>
                                <label htmlFor="like"><ThumbUpAltIcon /></label>
                            </div>
                            <div>
                                <input type="radio" name="grade" id='dislike' onChange={()=>setGrade('dislike')}/>
                                <label htmlFor="dislike"><ThumbDownIcon /></label>
                            </div>
                        </>:
                        grade === 'like'? 
                        <div className="like">
                            <ThumbUpAltIcon />
                        </div>
                        :
                        <div className="dislike">
                            <ThumbDownIcon />
                        </div>
                    }
                </div>
                <div className="button">
                    <button onClick={sendResults}>End Game</button>
                </div>
            </div>
            <Backdrop open={openBackdrop}/>
        </main>
    );
}

export default ResultsPage;
