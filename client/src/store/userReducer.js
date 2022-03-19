const defaultState = {

    currentUser: {},
    isLogined: false,

} 

export const userReducer = (state = defaultState, action) => {
    switch(action.type){

        case 'Set_User':

            return ({
                ...state,
                currentUser: action.payload.data,
                isLogined: action.payload.isLogined,
            })

        case 'Remove_User':
            
            return({
              ...defaultState
            })

        default:
            return state
    }
}