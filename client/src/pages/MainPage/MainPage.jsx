import React from 'react'; 
import { useSelector } from 'react-redux';
import Footer from '../../components/MainComponents/Footer/Footer';
import Header from '../../components/MainComponents/NavBar/Header';
import Mainlogined from '../../components/PageComponents/MainPage/MainLogined/MainLogined';
import MainNotLogined from '../../components/PageComponents/MainPage/MainNotLogined/MainNotLogined';
import './main-page.scss'

const MainPage = () => {

    const { isLogined } = useSelector(state=> state.user)

    return (
        <main className='main-page'>
            <Header />
            {
                isLogined === true? 
                <>
                    <Mainlogined />
                    <Footer />
                </> 
                : 
                <MainNotLogined />
            }
        </main>
    );
}

export default MainPage;
