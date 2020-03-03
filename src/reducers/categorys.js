import {CREATE_CATEGORY_START, CREATE_CATEGORY_SUCCESS, CREATE_CATEGORY_ERROR, GET_CATEGORYS_START, GET_CATEGORYS_SUCCESS, GET_CATEGORYS_ERROR} from '../actions/actionsTypes';

const initialStete = {
    error: null,
    loading: false,
    categorys: [],
}

export default function categorys(state = initialStete, action){
    switch(action.type){
        case CREATE_CATEGORY_START: 
            return {
                ...state, loading: action.loading
            }
        case CREATE_CATEGORY_SUCCESS: 
            return {
                ...state, loading: action.loading, categorys: action.categorys
            }
        case CREATE_CATEGORY_ERROR: 
            return {
                ...state, loading: action.loading, error: action.error
            }
        case GET_CATEGORYS_START: 
            return {
                ...state, loading: action.loading
            }
        case GET_CATEGORYS_SUCCESS: 
            return {
                ...state, loading: action.loading, categorys: action.categorys
            }
        case GET_CATEGORYS_ERROR: 
            return {
                ...state, loading: action.loading, error: action.error
            }
        default:
            return state
    }
}