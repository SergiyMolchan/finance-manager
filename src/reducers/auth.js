import {AUTH_START, AUTH_SUCCESS, AUTH_ERROR, AUTH_LOGOUT} from '../actions/actionsTypes';

const initialState = {
    token: localStorage.getItem('jwt-token') || null,
    error: null,
    loading: false
}

export default function auth(state = initialState, action){
    switch(action.type){
        case AUTH_START:
            return{
                ...state, loading: action.loading
            }
        case AUTH_SUCCESS:
            return{
                ...state, token: action.token, loading: action.loading
            }
        case AUTH_ERROR:
            return{
                ...state, error: action.error, loading: action.loading
            }
        case AUTH_LOGOUT:
            return{
                ...state, token: null
            }
        default:
            return state
    }
}
