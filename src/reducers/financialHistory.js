import {GET_LIST_START, GET_LIST_SUCCESS, GET_LIST_ERROR} from '../actions/actionsTypes';

const initialStete = {
    error: null,
    loading: false,
    hystoryList: [],
}

export default function financialHistory(state = initialStete, action){
    switch(action.type){
        case GET_LIST_START:
            return {
                ...state, loading: true
            }
        case GET_LIST_SUCCESS:
            return {
                ...state, loading: false, hystoryList: action.hystoryList
            }
        case GET_LIST_ERROR:
            return {
                ...state, loading: false, error: action.error
            }
        default:
            return state
    }
}