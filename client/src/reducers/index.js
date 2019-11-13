import { combineReducers } from 'redux'
import { reducer as formReducer } from 'redux-form'
import ethReducer from './ethReducer'
import authReducer from './authReducer'
import alertReducer from './alertReducer'
import profileReducer from './profileReducer'




// 这地方引入redux-form

export default combineReducers({
    form: formReducer,
    eth:ethReducer,
    auth:authReducer,
    alerts:alertReducer,
    profile:profileReducer
})
