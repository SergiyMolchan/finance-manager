import {REGISTRATION_START, REGISTRATION_SUCCESS, REGISTRATION_ERROR, REGISTRATION_NEW} from '../actions/actionsTypes';

const initialState = {
    error: null,
    loading: false,
    registered: false
}

export default function auth(state = initialState, action){
    switch(action.type){
        case REGISTRATION_START:
            return{
                ...state, loading: true
            }
        case REGISTRATION_SUCCESS:
            return{
                ...state, loading: false, registered: action.registered
            }
        case REGISTRATION_ERROR:
            return{
                ...state, loading: false, error: action.error
            }
        case REGISTRATION_NEW:
            return{
                ...state, registered: false
            }
        default:
            return state
    }
}