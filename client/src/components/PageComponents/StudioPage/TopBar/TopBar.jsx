import React from 'react';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import AddSharpIcon from '@mui/icons-material/AddSharp';
import './top-bar.scss'

const TopBar = ({quizzes}) => {

    const user = useSelector(state=>state.user)

    return (
        <header className='top-bar'>
            <div className="main full-block">
                <h3 className="info">
                    {user.currentUser.user.name}, {quizzes === null? '0' : quizzes.length} results:    
                </h3>
                <div className="create-new">
                    <Link to="/studio/create">
                        <button>
                            Create New <AddSharpIcon />
                        </button>
                    </Link>    
                </div>
            </div>
        </header>
    );
}

export default TopBar;
