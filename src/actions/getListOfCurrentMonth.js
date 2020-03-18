import {GET_LIST_START, GET_LIST_SUCCESS, GET_LIST_ERROR} from './actionsTypes';

export function getListOfCurrentMonth(){
    return async dispatch => {
            const url = '/api/financialHistory/getFinancialHistoryByCurrentMonth';
        dispatch(get_list_start());
        try {
            const res = await fetch(url, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': localStorage.getItem('jwt-token')
                },
            });
                const json = await res.json();
                if(res.status === 200){
                    dispatch(get_list_succes(json.financialhistory));
                }
                if(res.status === 409){
                    dispatch(get_list_error(json.message));
                }
        } catch (error) {
            dispatch(get_list_error(error));
            console.error(error);
        }
    }
}

export function get_list_start(){
    return{
        type: GET_LIST_START,
        loading: true
    }
}

export function get_list_succes(list){
    return{
        type: GET_LIST_SUCCESS,
        hystoryList: list,
        loading: false
    }
}

export function get_list_error(error){
    return{
        type: GET_LIST_ERROR,
        error: error,
        loading: false
    }
}