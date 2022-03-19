import api from '../http/index'

const HistoryService = ({alert, openBackdrop}) => {
    return {

        getHistory: function (id) {
            return async dispatch => {
                try {
                   
                    return await api.get('/history/get-history', {params: {id: id}})
                    .then(response => {
                        dispatch({type: 'Set_History', payload: response.data})
                    })
    
                } catch (error) {
                    throw new Error(error.response.data.message)
                }
            }
        },

        DeleteHistory: function (id, score) {
            return async dispatch => {
                try {
                   
                    return await api.delete('/history/delete-history', {params: {id: id, scoreId: score}})
                    .then(response => {
                        dispatch({type: 'Set_History', payload: response.data})
                    })
    
                } catch (error) {
                    throw new Error(error.response.data.message)
                }
            }
        },

    }
}

export default HistoryService