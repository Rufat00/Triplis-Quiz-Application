import React, { useEffect, useState } from 'react';
import Header from '../../components/MainComponents/NavBar/Header'
import QuizService from '../../service/QuizService'
import Alert from '../../components/MainComponents/Alert/Alert'
import Backdrop from '../../components/MainComponents/Backdrop/Backdrop'
import Dialog from '../../components/MainComponents/Dialog/Dialog'
import useAlert from '../../components/MainComponents/Notification/useAlert'
import './studio-page.scss'
import { useSelector } from 'react-redux';
import TopBar from '../../components/PageComponents/StudioPage/TopBar/TopBar';
import './studio-page.scss'
import QuizBar from '../../components/PageComponents/StudioPage/QuizBar/QuizBar';

const StudioPage = () => {

    const [open , setOpen] = useState(false)
    const [openDelete , setOpenDelete] = useState(false)
    const [deleteId, setDeleteId] = useState('')

    const [alertProps, alert] = useAlert({})

    const [quizzes, setQuizzes] = useState(null)

    const user = useSelector(state=>state.user)

    const getQuizzes = async () => {
        const response = await QuizService({openBackdrop: setOpen, alert: alert}).getOwnQuizzes(user.currentUser.user.id)
        if(response.data){
            return setQuizzes(response.data)
        }
        setQuizzes(null)
    }

    const deleteFunction = (id) => {
        setOpenDelete(true)
        setDeleteId(id)
    }

    const deleteQuiz = () => {
        QuizService({openBackdrop: setOpen, alert: alert}).delete(deleteId)
        .then(()=>{
            setOpenDelete(false)
        })
        .then(()=>{
            setQuizzes(null)
            getQuizzes()
        })
    }

    useEffect(() => {
        getQuizzes()
    },[]);

    return (
        <main className='studio-page'>
            <Header />
            <TopBar quizzes={quizzes}/>
            {
                quizzes === null? <h3 className='warn'>No quizzes yet...</h3>
                :
            <section className="main-section">
                <div className="quizzes">
                    {
                        quizzes.map((quiz, i)=>
                            <QuizBar key={i} quiz={quiz} deleteFunc={deleteFunction}/>
                        )
                    }    
                </div>
            </section>
            }
            <Alert {...alertProps}/>
            <Backdrop open={open}/>

            <Dialog open={openDelete} openFunc={setOpenDelete}>
                <div className="studio-dialog">
                    <h3>Be careful quiz will deleted forever!</h3>
                    <button className='delete' onClick={deleteQuiz}>Delete</button>
                </div>
            </Dialog>
        </main>
    );
}

export default StudioPage;
