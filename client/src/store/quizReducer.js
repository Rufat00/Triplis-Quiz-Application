const defaultState = {

    quiz: {},
    results: {}

} 

export const quizReducer = (state = defaultState, action) => {
    switch(action.type){

        case 'Set_Quiz':

            return ({
                ...state,
                quiz: action.payload,
            })

        case 'Set_Results': 
            
            return ({
                ...state,
                results: action.payload,
            })

        case 'Remove_Quiz':
            
            return({
              ...defaultState
            })

        default:
            return state
    }
}