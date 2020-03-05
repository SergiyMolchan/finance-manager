import {GET_LIST_START, GET_LIST_SUCCESS, GET_LIST_ERROR, CREATE_INCOME_OR_EXPENSES_ITEM_START, CREATE_INCOME_OR_EXPENSES_ITEM_SUCCESS, CREATE_INCOME_OR_EXPENSES_ITEM_ERROR} from '../actions/actionsTypes';

const initialStete = {
    error: null,
    loadingCreate: false,
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
        case CREATE_INCOME_OR_EXPENSES_ITEM_START:
            return {
                ...state, loadingCreate: true
            }
        case CREATE_INCOME_OR_EXPENSES_ITEM_SUCCESS:
            return {
                ...state, loadingCreate: false, hystoryList: action.hystoryList
            }
        case CREATE_INCOME_OR_EXPENSES_ITEM_ERROR:
            return {
                ...state, loadingCreate: false, error: action.error
            }
        default:
            return state
    }
}