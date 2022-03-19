import { useState } from "react"

const useAlert = ({type = '', text='', duration = 5000}) => {

    const [props, setProps] = useState({
        type: type,
        duration: duration,
        closeFunc: closeFunc,
        text: text,
    })

    const [open, setOpen] = useState(false)

    function closeFunc(){
        setOpen(false)
    }

    const alert = {

        close: function(){
            setOpen(false)
        },

        open: function(){
            setOpen(true)
        },

        setText: function(newText = props.text){
            setProps({...props, text: newText})
        },

        success: function(newText = props.text){
            setProps({...props, type: 'success', text: newText})
        },

        warn: function(newText = props.text){
            
            setProps({...props, type: 'warn', text: newText})
        },
        
        info: function(newText = props.text){
            
            setProps({...props, type: 'info', text: newText})
        },
        
        error: function(newText = props.text){
            
            setProps({...props, type: 'error', text: newText})
        },
        
        default: function(newText = props.text){
            
            setProps({...props, type: '', text: newText})
        },
        

    }

    return [{...props,open}, alert]

}

export default useAlert