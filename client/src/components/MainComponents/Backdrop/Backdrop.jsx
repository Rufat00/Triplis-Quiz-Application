import React from 'react';
import './backdrop.scss'

const Backdrop = (props) => {
    return (
        <div className={props.open===true? 'backdrop show' : 'backdrop'}>
            <div className="loading">

            </div>
        </div>
    );
}

export default Backdrop;
