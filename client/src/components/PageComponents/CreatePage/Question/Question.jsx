import React, { useState } from 'react';
import AddPhotoAlternateIcon from '@mui/icons-material/AddPhotoAlternateSharp';
import AddSharpIcon from '@mui/icons-material/AddSharp';
import CloseSharpIcon from '@mui/icons-material/CloseSharp';
import './question.scss'

const Question = ({stateFunc, state,question, index}) => {

    const [image, setImage] = useState('')

    const changeImage = (e) => {

        const reader = new FileReader();
        reader.readAsDataURL(e.target.files[0]);

        reader.onloadend = () => {
            setImage(reader.result);

            state.questions[index].image = reader.result
            stateFunc({...state})
        }; 

        e.target.value = ''
    };
    console.log(state);
    const removeImage = () => {
        setImage('');
        state.questions[index].image = ''
        stateFunc({...state})
    } 

    const changeQuestion = e => {
        state.questions[index].question = e.target.value
        stateFunc({...state})
    }

    const changeAnswer = i => e => {

        state.questions[index].answers[i] = {
            answer: e.target.value,
            correct: state.questions[index].answers[i].correct
        }

        stateFunc({...state})

    }

    const changeCorrect = i => e => {

        state.questions[index].answers[i] = {
            answer: state.questions[index].answers[i].answer,
            correct: state.questions[index].answers[i].correct === true? false : true
        }

        stateFunc({...state})

    }

    const add = () => {

        state.questions[index].answers.push({
            answer: '',
            correct: false,
        })

        stateFunc({...state})
    }

    const remove = i => {

        state.questions[index].answers.splice(i,1)
        stateFunc({...state})
    }

    const removeQuestion = () => {
        state.questions.splice(index,1);
        stateFunc({...state})
    }

    return (
        <div className='question'>
            <h3 className='title'>Question №{index + 1}</h3>
            <button className="delete-question" onClick={removeQuestion}><CloseSharpIcon /></button>

            <div className="image-preview">
                <img src={image} alt="answer" />
                <button onClick={removeImage}><CloseSharpIcon /></button>
            </div>

            <div className='question-image'>
                <label htmlFor={index}>
                    <div>
                        <AddPhotoAlternateIcon />    
                    </div>    
                </label>
                <input type="file" id={index} accept='image/*' onChange={changeImage}/>
            </div> 

            <div className="question-input">
                <label>Question:</label>
                <input type="text" value={state.questions[index].question} onChange={changeQuestion}/>
            </div>

            <div className="answers">
                <div className="answers-header">
                    <label>Answers:</label>
                    <button onClick={add}><AddSharpIcon /></button>
                </div>
                {
                    state.questions[index].answers.map((answer,i) => 
                        <div className="answer" key={i}>
                            <div>

                                <label>
                                    <button onClick={()=>remove(i)}><CloseSharpIcon /></button>
                                    {i+1}:
                                </label>

                                <input type="text" value={state.questions[index].answers[i].answer} onChange={changeAnswer(i)}/>  
                                  
                            </div>
                            <div>
                                <label>Correct:</label>
                                <input type="checkbox" checked={state.questions[index].answers[i].correct} onChange={changeCorrect(i)}/>   
                            </div>    
                        </div>
                    )
                }    
            </div>

        </div>
    );
}

export default Question;
