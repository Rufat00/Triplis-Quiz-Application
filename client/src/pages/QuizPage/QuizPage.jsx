import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate, useParams } from 'react-router-dom';
import './quiz-page.scss'
import Alert from '../../components/MainComponents/Alert/Alert'
import Backdrop from '../../components/MainComponents/Backdrop/Backdrop'
import useAlert from '../../components/MainComponents/Notification/useAlert'
import PlayService from '../../service/PlayService'
import Preloader from '../../components/PageComponents/QuizPage/Preloader/Preloader';
import Quiz from '../../components/PageComponents/QuizPage/Quiz/Quiz';

const QuizPage = () => {

    const {id} = useParams()
    const [currentPosition, setCurrentPosition] = useState(null)
    const quiz = useSelector(state=>state.quiz)
    const dispatch = useDispatch()
    const navigate = useNavigate()
    
    const [openBackdrop , setOpenBackdrop] = useState(false)
    const [alertProps, alert] = useAlert({})

    const play = async () => {
        dispatch(PlayService({openBackdrop: setOpenBackdrop, alert: alert}).play(id))
    }

    const check = async (id,question) => {
        return await PlayService({openBackdrop: setOpenBackdrop, alert: alert}).check(id, question)
    }

    const next = () => {
        if( currentPosition === quiz.quiz.questions.length - 1){
            return navigate(`/quiz/${id}/results/${quiz.quiz.questions.length}`)
        }
        setCurrentPosition(currentPosition + 1)
    }

    useEffect(() => {
        play()

        return () => {
            setCurrentPosition(null)
        }
    }, []);

    return (
        <main className='quiz-page'>
            {
                currentPosition === null ? <Preloader quiz={quiz.quiz} play={setCurrentPosition}/>
                : <Quiz quiz={quiz.quiz} i={currentPosition} checkFunc={check} nextFunc={next}/>
            }
            <Alert {...alertProps}/>
            <Backdrop open={openBackdrop}/>
        </main>
    );
}

export default QuizPage;
