import {REGISTRATION_START, REGISTRATION_SUCCESS, REGISTRATION_ERROR} from '../actions/actionsTypes';

const initialState = {
    error: null,
    loading: false
}

export default function auth(state = initialState, action){
    switch(action.type){
        case REGISTRATION_START:
            return{
                ...state, loading: true
            }
        case REGISTRATION_SUCCESS:
            return{
                ...state, loading: false
            }
        case REGISTRATION_ERROR:
            return{
                ...state, loading: false, error: action.error
            }

        default:
            return state
    }
}