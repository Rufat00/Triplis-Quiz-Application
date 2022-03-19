import {applyMiddleware, combineReducers, createStore} from 'redux'
import thunk from 'redux-thunk'
import { userReducer } from './userReducer'
import { quizReducer } from './quizReducer'
import { historyReducer } from './historyReducer'

const rootReducer = combineReducers({user: userReducer, quiz: quizReducer, history: historyReducer})

export const store = createStore(rootReducer, applyMiddleware(thunk))