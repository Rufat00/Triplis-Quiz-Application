import React, { useEffect, useState } from 'react';
import CloseSharpIcon from '@mui/icons-material/CloseSharp';
import CheckCircleOutlinedIcon from '@mui/icons-material/CheckCircleOutlined';
import ErrorOutlineOutlinedIcon from '@mui/icons-material/ErrorOutlineOutlined';
import HourglassBottomIcon from '@mui/icons-material/HourglassBottom'
import Timer from '../Timer/Timer';
import './quiz.scss'
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom'

const Quiz = ({quiz, i, checkFunc, nextFunc}) => {

    const [answers, setAnswers] = useState([])
    const [selected, setSelected] = useState(null)
    const [isTrue , setIsTrue] = useState(null)
    const [question, setQuestion] = useState(quiz.questions[i])
    const [stoped, setStoped] = useState(false)
    const [time, setTime] = useState(quiz.duration / 1000)

    const dispatch = useDispatch()
    const {results} = useSelector(state=>state.quiz)
    const navigate = useNavigate()

    const start = () => {
        setAnswers([])
        setSelected(null)
        setIsTrue(null)
        setQuestion(quiz.questions[i])
        setStoped(false)
    };

    const check = async () => {
        const answers = await checkFunc(quiz.id, i)
        setAnswers(answers.data)
        return answers.data
    }

    const stop = async (index) => {

        setSelected(index)
        setStoped(true)
        await check()
        .then((response)=>{
            if(index === null){           
                for(let i = 0; i < response.length; i++){
                    if(response[i].correct === true){
                        setIsTrue(false)
                        break
                    }
                    setIsTrue(true)
                    dispatch({type: 'Set_Results', payload:{
                        ...results,
                        corrects: results.corrects + 1,
                        time: results.time + (quiz.duration / 1000 - time)
                    }})
                }
                return
            }
            if(response[index].correct === true){
                setIsTrue(true)
                dispatch({type: 'Set_Results', payload:{
                    ...results,
                    corrects: results.corrects + 1,
                    time: results.time + (quiz.duration / 1000 - time)
                }})
            }
            else{
                setIsTrue(false)
            }
        })
    }

    useEffect(() => {
        start()
    }, [i]);

    const exit = () => {
        dispatch({type: 'Remove_Quiz'})
        navigate('/')
    }

    return (
        <section className='quiz'>
            <header className='quiz-header'>
                <div className='full-block'>
                    <button onClick={exit}><CloseSharpIcon /></button>
                    <Timer duration={quiz.duration} stopFunc={stop} index={i} isStoped={stoped} time={time} setTime={setTime}/>   
                </div>
            </header>
            <div className="main block">

                {question.image === null? '' :
                    <div className='image'>
                        <img src={question.image} alt="question" />  
                    </div>
                }
                <h2 className="question-text">{question.question}</h2>
                
                <div className="answers block">
                    { answers.length === 0? <div className="answer skip-next" onClick={()=>stop(null)}>Skip</div>: <div className="answer skip-next" onClick={nextFunc}>Next</div>

                    }
                    {
                        answers.length === 0? 
                        question.answers.map((answer, index) => 
                            <div className="answer" key={index} onClick={()=>stop(index)} >{answer}</div>    
                        )
                        :
                        answers.map((answer, index) => {
                            if(isTrue === true){
                                return <div className={`answer ${index === selected && answer.correct === true? 'correct' : ''}`} key={index}>{answer.answer}</div>
                            }
                            if(isTrue === false){
                                return <div className={`answer ${index === selected? 'not-correct' : answer.correct === true? 'correct' : ''}`} key={index}>{answer.answer}</div>
                            }
                        })
                    }    

                </div>
            </div>
            <div className={`footer ${
                    isTrue === true? 'correct' : isTrue === false? 'not-correct' : ''  
                }`}>
                <div className="full-block">
                    {isTrue === true? <CheckCircleOutlinedIcon /> : isTrue === false? <ErrorOutlineOutlinedIcon /> : 
                    <div className="waiting"><HourglassBottomIcon></HourglassBottomIcon></div>}
                    <div className="position">
                        <span>{i+1}</span>
                        <span>/</span>
                        <span>{quiz.questions.length}</span>    
                    </div>
                </div>
            </div>
        </section>
    );
}

export default Quiz;
