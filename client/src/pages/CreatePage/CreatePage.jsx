import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import Header from '../../components/MainComponents/NavBar/Header';
import MainSettings from '../../components/PageComponents/CreatePage/MainSettings/MainSettings';
import Questions from '../../components/PageComponents/CreatePage/QuestionsSection/Questions';
import QuizService from '../../service/QuizService'
import Alert from '../../components/MainComponents/Alert/Alert'
import Backdrop from '../../components/MainComponents/Backdrop/Backdrop'
import useAlert from '../../components/MainComponents/Notification/useAlert'
import './create-page.scss'
import { useNavigate } from 'react-router-dom';

const CreatePage = () => {

    const user = useSelector(state=>state.user)

    const [options, setOptions] = useState({
        author: user.currentUser.user.id,
        title: '',
        describtion: '',
        main_image: '',
        duration: 15000,
        private: false,
        create_date: new Date(),

        questions: [{
            question: 'Triplis Is The Best ?',
            image: '',
            answers: [
                {
                    answer: 'Yes',
                    correct: true,
                },
                {
                    answer: 'Of course',
                    correct: true,
                }
            ]
        }]
    })

    const navigate = useNavigate()

    const create = () => {
        QuizService({openBackdrop: setOpen, alert: alert}).create(options)
        .then(()=>{
            navigate('/studio')
        })
    }

    const [open , setOpen] = useState(false)
    const [alertProps, alert] = useAlert({})

    return (
        <main className='create-page'>
            <Header />
            <MainSettings stateFunc={setOptions} state={options} />
            <Questions stateFunc={setOptions} state={options} />
            <div className="save block">
                <button onClick={create}>Save {options.private === true? 'private' : 'public'} Quiz</button>
            </div>
            <Alert {...alertProps}/>
            <Backdrop open={open}/>
        </main>
    );
}

export default CreatePage;
