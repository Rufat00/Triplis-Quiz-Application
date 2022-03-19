import React from 'react';
import AddIcon from '@mui/icons-material/Add';
import './questions.scss'
import Question from '../Question/Question';

const Questions = ({state, stateFunc}) => {

    const add = () => {
        state.questions.push({
            question: '',
            image: '',
            answers: [{
                    answer: '',
                    correct: false,
                }]
        })

        stateFunc({...state})
    }

    return (
        <section className='questions-section'>
            <div className="block">
                
            {
                state.questions.map((question, index) =>
                    <Question key={index} stateFunc={stateFunc} index={index} state={state} question={question}/>
                )
            }

            </div>
            <hr />
            <div className="create-new block">
                    <button onClick={add}><AddIcon /></button>
            </div>
        </section>
    );
}

export default Questions;
