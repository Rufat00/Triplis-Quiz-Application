import moment from 'moment';
import React from 'react';
import ThumbUpAltIcon from '@mui/icons-material/ThumbUpAlt';
import ThumbDownIcon from '@mui/icons-material/ThumbDown';
import image from '../../../../img/non-image.png';
import './content-bar.scss'
import { useNavigate } from 'react-router-dom';

const ContentBar = ({content, searchQuery}) => {

    const hightlight = (text) => {
        const regexp = new RegExp(searchQuery, 'ig')
        const matchValue = text.match(regexp)
        if(matchValue){
            return text.split(regexp).map((value, index, array) => {
                if(index < array.length - 1){
                    const hightlightText = matchValue.shift()
                    return <>{value}<span key={index} className='hightlight'>{hightlightText}</span></>
                }
                return value
            })
        }
        return text
    }
    const navigate = useNavigate()

    return (
        <div className='content-bar'>
            <div className="content-image" onClick={()=>navigate(`/quiz/${content.id}`)}>
                <img src={
                    content.main_image === null? image
                    : content.main_image
                } alt="main" />
            </div>
            <div className="content">
                <div className="title">{hightlight(content.title)}</div>
                <div className="describtion">{hightlight(content.describtion)}</div>
                <div className="info">
                    <span className='date'>{moment(content.create_date).format('LL')}</span>
                    <span className='like'><ThumbUpAltIcon /> {content.likes}</span>
                    <span className='dislike'><ThumbDownIcon /> {content.dislikes}</span>   
                </div>
            </div>
        </div>
    );
}

export default ContentBar;
