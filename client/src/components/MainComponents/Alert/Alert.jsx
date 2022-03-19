import React from 'react';
import CloseIcon from '@mui/icons-material/Close';
import CheckCircleOutlinedIcon from '@mui/icons-material/CheckCircleOutlined';
import WarningAmberOutlinedIcon from '@mui/icons-material/WarningAmberOutlined';
import InfoOutlinedIcon from '@mui/icons-material/InfoOutlined';
import ErrorOutlineOutlinedIcon from '@mui/icons-material/ErrorOutlineOutlined';
import './alert.scss'
import { useEffect } from 'react';
import { useState } from 'react';

const Alert = ({type = '', open = false, closeFunc ,text, duration = 5000}) => {

    function hideAlert(){
        setVisible(true)
        closeFunc()
        setInterv2(setTimeout(() => {
            setVisible(false)
        }, 600))
    }

    const [visible, setVisible] = useState(false)
    const [interv, setInterv] = useState()
    const [interv2, setInterv2] = useState()

    const classes ={
        is: 'alert',
        type: type,
        show: open === true? 'show' : 'hide',
        visible: visible === true? 'visible' : '',
    }

    useEffect(() => {

        clearTimeout(interv) 

        if(open === true){
            setInterv(setTimeout(()=>{
                hideAlert()
            }, duration))
        }

        return () => {
            clearTimeout(interv)
            clearTimeout(interv2)
        }

    },[open])

    const typeIcon = () => {

        let is = ''

        if(classes.type === 'success'){
           return is = <CheckCircleOutlinedIcon />
        }
        if(classes.type === 'warn'){
            return is = <WarningAmberOutlinedIcon />
        }
        if(classes.type === 'info'){
            return is = <InfoOutlinedIcon />
        }
        if(classes.type === 'error'){
            return is = <ErrorOutlineOutlinedIcon />
        }

        return is
    }

    return (
        <div className={`${classes.is} ${classes.type} ${classes.show} ${classes.visible}`}>
            <div className="icon">
                {typeIcon()}
            </div>
            <div className="text">
                {text}
            </div>
            <div className="button">
                <button onClick={hideAlert}>
                    <CloseIcon />
                </button>
            </div>
        </div>
    );
}

export default Alert;
