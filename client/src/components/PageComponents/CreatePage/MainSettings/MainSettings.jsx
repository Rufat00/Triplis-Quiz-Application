import React, { useState } from 'react';
import AddPhotoAlternateIcon from '@mui/icons-material/AddPhotoAlternate';
import CloseSharpIcon from '@mui/icons-material/CloseSharp';
import './main-settings.scss'

const MainSettings = ({stateFunc, state}) => {

    const [image, setImage] = useState('')

    const changeImage = (e) => {

        const reader = new FileReader();
        reader.readAsDataURL(e.target.files[0]);

        reader.onloadend = () => {
            setImage(reader.result);
            stateFunc({...state, main_image: reader.result})
        };

        e.target.value = ''
    };

    const handleChange = (prop) => (event) => {
        stateFunc({ ...state, [prop]: event.target.value });
    };

    const setPrivate = () => {
        state.private === true? 
        stateFunc({...state,private: false})
        :
        stateFunc({...state,private: true})
    }
    
    return (
        <section className='create-page-settings'>
            <div className="block">

                <div className="image-preview">
                    <img src={image} alt='main'/>
                    <button onClick={()=>{
                        setImage('');
                        stateFunc({...state, main_image: ''})
                    }}><CloseSharpIcon /></button>
                </div>

                <div className='option main-image'>
                    <label htmlFor="main-image-input">
                        <div>
                            <AddPhotoAlternateIcon />    
                        </div>    
                    </label>
                    <input type="file" id="main-image-input" accept='image/*' onChange={changeImage}/>
                </div>

                <div className="option">
                    <label>Title:</label>
                    <input type="text" maxLength={100} onChange={handleChange('title')}/>    
                </div>

                <div className="option">
                    <label>Describtion:</label>
                    <input type="text" maxLength={100} onChange={handleChange('describtion')}/>    
                </div>

                <div className="option">
                    <label>Duration:</label>
                    <div>
                        <label>15-Seconds:</label>
                        <input type="radio" name='duration' value={15000} defaultChecked onChange={handleChange('duration')}/>  
                    </div>
                    <div>
                        <label>30-Seconds:</label>
                        <input type="radio" name='duration' value={30000} onChange={handleChange('duration')}/>  
                    </div>
                    <div>
                        <label>60-Seconds:</label>
                        <input type="radio" name='duration' value={60000} onChange={handleChange('duration')}/>  
                    </div>
                    <div>
                        <label>Private:</label>
                        <input type="checkbox" name="private" className='private' onChange={setPrivate}/>
                    </div>
                </div>

            </div>
            <hr />
        </section>
    );
}

export default MainSettings;
