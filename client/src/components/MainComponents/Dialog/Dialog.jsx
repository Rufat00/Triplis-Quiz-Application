import React from 'react';
import './dialog.scss'

const Dialog = ({children, open , openFunc}) => {

    return (
        <div className={`dialog-bg ${ open === true? 'open' : '' }`} onClick={()=>openFunc(false)}>
            <div className="dialog" onClick={(e)=>e.stopPropagation()}>
                {children}
            </div>
        </div>
    );
}

export default Dialog;
