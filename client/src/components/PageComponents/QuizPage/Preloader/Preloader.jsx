import React from 'react';
import moment from 'moment'
import ThumbUpAltIcon from '@mui/icons-material/ThumbUpAlt';
import ThumbDownIcon from '@mui/icons-material/ThumbDown';
import './preloader.scss'

const Preloader = ({quiz, play}) => {
    
    return (
        <section className='preloader block'>
            {!quiz.main_image? '' : 
            <div className="image-preloade">
                <img src={quiz.main_image} alt="preloade" />
            </div>
            }
            <div className="data">
                
                <h1 className="title">{quiz.title}</h1>
                <h3 className="describtion">{quiz.describtion}</h3>
                <div className="info">
                    <div className="author">
                        <div className="avatar"><img src={quiz.author_avatar} alt="avatar" /></div>
                        <h3>{quiz.author} </h3>
                    </div>
                    <div className="options">
                        <span className='date'>{moment(quiz.create_date).format('LL')}</span>
                        {quiz.private === true? <span className='private'>Private</span> : <span className='public'>Public</span>}
                        <span className='duration'>{quiz.duration / 1000} seconds</span>
                        <span className="likes"><ThumbUpAltIcon />{quiz.likes}</span>
                        <span className="dislikes"><ThumbDownIcon />{quiz.dislikes}</span>
                    </div>
                </div>

            </div>
            <ol className="rules">
                <div className='rules-header'>Rules:</div>
                <li className="rule">You have only {quiz.duration / 1000} seconds to answer for one question.</li>
                <li className="rule">There may be multiple correct answers.</li>
                <li className='rule'>If you think that there is no correct answer, <br />then press the skip button or wait until the end of the time.</li>
                <li className='rule'>Once you select your answer, it can't be undone.</li>
                <li className="rule">If you exit from the quiz during the game you won't get points.</li>
                <li className="rule">You'll get points on the basis of your correct answers.</li>

            </ol>
            <div className="button"><button onClick={()=>play(0)}>Play</button></div>
        </section>
    );
}

export default Preloader;
