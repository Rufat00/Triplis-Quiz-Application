import api from '../http/index'

const PlayService = ({alert, openBackdrop}) => {
    return {

        connect: async function(pin){
            try {
                return await api.get('/quiz/connect',{params: {pin: pin}})

            } catch (error) {
                throw new Error(error.response.data.message)
            }
        },

        play: function(id){
            return async dispatch => {
                try {
                
                    openBackdrop(true)
                    return await api.get('/play/play', {params: {id: id}})
                    .then(response=>{
                        dispatch({type:'Set_Quiz',payload: response.data})
                        dispatch({type: 'Set_Results',payload: {
                            quiz: response.data.id,
                            corrects: 0,
                            time: 0,
                            date: new Date()
                        }})
                    })
                    .then(()=>{
                        openBackdrop(false)
                    })
    
                } catch (error) {
                    if(error.response){
                        alert.error(error.response.data.message)
                        alert.open()
                    }
                    openBackdrop(false)
                    throw new Error(error.response.data.message)
                }
            }
        },

        check: async function(id, question) {
            try {
                
                openBackdrop(true)
                const response = await api.get('/play/check', {params: {id: id, question: question}})
                openBackdrop(false)
                return response


            } catch (error) {
                if(error.response){
                    alert.error(error.response.data.message)
                    alert.open()
                }
                openBackdrop(false)
                throw new Error(error.response.data.message)
            }
        },

        sendResults: function(data) {
            return async dispatch => {
                try {
                    openBackdrop(true)
                    return await api.post('/play/results', {...data})
                    .then(()=>{
                        dispatch({type: 'Remove_Quiz'})
                        openBackdrop(false)
                    })
    
                } catch (error) {
                    throw new Error(error.response.data.message)
                }
            }
        }

    }
}

export default PlayService