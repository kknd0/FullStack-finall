import axios from 'axios'
import { REGISTER_FAIL, REGISTER_SUCCESS, USER_LOADED, AUTH_ERROR, LOGIN_FAIL, LOGIN_SUCCESS } from '../types'

import { setAlert } from '../alertActions'
import setAuthToken from './setAuthToken'
import history from '../../history'

// Register User
export const postRegister = ({ name, phone, password }) => async dispatch => {
    const config = {
        // baseURL: 'http://localhost:5000',
        headers: {
            'Content-type': 'application/json',
        },
    }
    const body = JSON.stringify({ name, phone, password })
    try {
        const response = await axios.post('/api/users', body, config)
        dispatch({
            type: REGISTER_SUCCESS,
            payload: response.data,
        })

        dispatch(loadUser())

        history.push('/')
    } catch (err) {
        const errors = err.response.data.errors
        errors.forEach(({ msg }) => {
            dispatch(setAlert(msg, 'danger'))
        })
        dispatch({
            type: REGISTER_FAIL,
        })
    }
}

export const postLogin = ({ phone, password }) => async dispatch => {
    const config = {
        // baseURL:'http://localhost:5000',
        headers: {
            'Content-type': 'application/json',
        },
    }
    const body = JSON.stringify({ phone, password })
    try {
        const response = await axios.post('/api/auth', body, config)
        console.log(response)
        dispatch({
            type: LOGIN_SUCCESS,
            payload: response.data,
        })

        dispatch(loadUser())

        history.push('/')
    } catch (err) {
        const errors = err.response.data.errors
        if (errors) {
            errors.forEach(({ msg }) => {
                dispatch(setAlert(msg, 'danger'))
            })
        }
        dispatch({
            type: LOGIN_FAIL,
        })
    }
}

export const loadUser = () => async dispatch => {
    if (localStorage.token) {
        setAuthToken(localStorage.token)
    }
    try {
        const res = await axios.get('/api/auth')
        dispatch({
            type: USER_LOADED,
            payload: res.data,
        })
    } catch (err) {
        dispatch({ type: AUTH_ERROR })
    }
}
