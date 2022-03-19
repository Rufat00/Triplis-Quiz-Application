import React, { useEffect, useState } from 'react';
import Footer from '../../components/MainComponents/Footer/Footer';
import Header from '../../components/MainComponents/NavBar/Header';
import ConnectBar from '../../components/PageComponents/PlayPage/ConnectBar/ConnectBar';
import ContentBar from '../../components/PageComponents/PlayPage/ContentBar/ContentBar';
import SearchBar from '../../components/PageComponents/PlayPage/SearchBar/SearchBar';
import QuizService from '../../service/QuizService';
import './play-page.scss'

const PlayPage = () => {

    const [content, setContent] = useState(null)

    const [searchQuery, setSearchQuery] = useState('')

    const getContent = async () => {
        await QuizService({alert: null, openBackdrop: null}).getQuizzes()
        .then(response => {
            setContent(response.data)
        })
    }
    
    useEffect(()=>{
        getContent()
        
        return ()=>{
            setContent(null)
        }
    },[])
 

    return (
        <main className='play-page'>
            <Header />
            <ConnectBar/>
            <SearchBar value={searchQuery} setValue={setSearchQuery}/>
            <section className="content block">
                {
                    content === null? <div className="content-placeholder">Loading...</div>
                    : content.filter(value=>{
                        let v;
                        if(searchQuery === ''){
                            v = value
                        }
                        if(
                            value.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                            value.describtion.toLowerCase().includes(searchQuery.toLowerCase())
                        ){
                            v = value
                        }
                        return v

                    }).map((value, i)=>
                        <ContentBar key={i} content={value} searchQuery={searchQuery}/>
                    )
                }    
            </section> 
            <Footer />
        </main>
    );
}

export default PlayPage;
