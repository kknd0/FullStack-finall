import axios from 'axios'

const setAuthToken = Token =>{
    if(token){
        axios.defaults.headers.common['x-auth-token'] = token
    }else {
        delete axios.defaults.headers.common['x-auth-token']
    }
}

export default setAuthToken