import { REGISTER_SUCCESS, REGISTER_FAIL, USER_LOADED, AUTH_ERROR, LOGIN_FAIL, LOGIN_SUCCESS, LOGOUT } from '../actions/types'

const initialState = {
    token: localStorage.getItem('token'),
    isAuthenticated: null,
    authLoading: true,
    user: null,
}

export default (state = initialState, { type, payload }) => {
    switch (type) {
        case USER_LOADED:
            return {
                ...state,
                isAuthenticated: true,
                authLoading: false,
                user: payload,
            }

        case LOGIN_SUCCESS:
        case REGISTER_SUCCESS:
            localStorage.setItem('token', payload.token)
            return {
                ...state,
                ...payload,
                isAuthenticated: true,
                authLoading: false,
            }

        case LOGIN_FAIL:
        case REGISTER_FAIL:
        case AUTH_ERROR:
        case LOGOUT:
            localStorage.removeItem('token')

            return {
                ...state,
                token: null,
                isAuthenticated: false,
                authLoading: false,
            }

        default:
            return state
    }
}
