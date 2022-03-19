const defaultState = {

    scores: [],
    record: {},
    received: false

} 

export const historyReducer = (state = defaultState, action) => {
    switch(action.type){

        case 'Set_History':

            return ({
                ...action.payload,
                received: true
            })

        case 'Remove_History':
            
            return({
              ...defaultState
            })

        default:
            return state
    }
}