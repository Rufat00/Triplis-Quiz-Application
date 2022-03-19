import React from 'react';
import { Link } from 'react-router-dom'
import './not-logined.scss'

const MainNotLogined = () => {
    return (
        <section className='not-logined'>
            <div className="main block">
                <h1>Play and create the best quiz games</h1>
                <h3><p>Triplis is a social app for building and playing interesting quizzes</p></h3>
                <div className="actions">
                    <Link to="/login"><button>Log in</button></Link>
                    <Link to="/registration"><button>Sign Up</button></Link>
                </div>
            </div>
            <div className="overfolow"></div>
        </section>
    );
}

export default MainNotLogined;
