import { GET_PROFILE, PROFILE_ERROR } from "../actions/types"

const initialState = {
    profile: null,
    profiles: [],
    // items:[],
    // EthAccounts:[],
    // games:[],
    repos:[],
    profileLoading:true,
    error:{}
}

export default (state = initialState, { type, payload }) => {
    switch (type) {
        case GET_PROFILE:
            return { ...state, profile:payload, profileLoading:false }

        case PROFILE_ERROR:
            return { ...state, error:payload, profileLoading:false}
            
        

        default:
            return state
    }
}
