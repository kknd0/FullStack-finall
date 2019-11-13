import axios from 'axios'
import { setAlert } from '../alertActions'
import { GET_PROFILE, PROFILE_ERROR } from '../types'

export const getCurrentProfile = () => async dispatch => {
    try {
        const response = await axios.get('/api/profile/me')
        dispatch({
            type: GET_PROFILE,
            payload: response.data,
        })
    } catch (err) {
        dispatch({
            type: PROFILE_ERROR,
            payload: { msg: err.response.statusText, status: err.response.status },
        })
    }
}
