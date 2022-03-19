import React from 'react';
import moment from 'moment'
import { useNavigate } from 'react-router-dom'
import DeleteIcon from '@mui/icons-material/Delete';
import PlayCircleOutlineIcon from '@mui/icons-material/PlayCircleOutline';
import './quiz-bar.scss';

const QuizBar = ({quiz, deleteFunc}) => {

    const navigate = useNavigate()

    return (
        <div className='quiz-bar'>
            <div className="main full-block">
                <div className="option">
                    <span>Pin Code:</span>
                    {quiz.pin}  
                </div>
                <div className="option">
                    <span>Creating Date:</span>
                    {moment(quiz.create_date).format('LL')}
                </div>
                <div className="option">
                    <span>Title:</span>
                    <b>{quiz.title}</b>
                </div>
                <div className="option">
                    <span>Duration:</span>
                    {quiz.duration / 1000}sec
                </div>
                <div className="option">
                    <span>Likes: <b>{quiz.likes}</b></span>
                    <span>Dislikes: <b>{quiz.dislikes}</b></span>    
                </div>
                <div className="option">
                    <span className={`badge ${quiz.private === true? 'private' : 'public'}`}>
                        {quiz.private === true? 'Private' : 'Public'}
                    </span>
                </div>
                <div className="option buttons">
                    <button onClick={()=>navigate(`/quiz/${quiz._id}`)}><PlayCircleOutlineIcon /></button>
                    <button onClick={()=>{deleteFunc(quiz._id)}}><DeleteIcon /></button> 
                </div>
            </div>
        </div>
    );
}

export default QuizBar;
