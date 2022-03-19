import React from 'react';
import { Link } from 'react-router-dom'
import Footer from '../../components/MainComponents/Footer/Footer';
import logo from '../../img/logo.png'
import './error-page.scss'

const ErrorPage = () => {
    return (
        <main className='error-page'>
            <section>
                <img src={logo} alt="logo" />
                <h2>Error 404.</h2>
                <h3>Page not found <Link to='/' className='link'>Home Page</Link></h3>
            </section>
            <Footer />
        </main>
    );
}

export default ErrorPage;
