import {AUTH_SUCCESS, AUTH_ERROR, AUTH_LOGOUT} from '../actions/actionsTypes';

const initialState = {
    token: null,
    error: null
}

export default function auth(state = initialState, action){
    switch(action.type){
        case AUTH_SUCCESS:
            return{
                ...state, token: action.token
            }
        case AUTH_ERROR:
            return{
                ...state, error: action.error
            }
        case AUTH_LOGOUT:
            return{
                ...state, token: null
            }
        default:
            return state
    }
}
