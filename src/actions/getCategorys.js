import {GET_CATEGORYS_START, GET_CATEGORYS_SUCCESS, GET_CATEGORYS_ERROR} from './actionsTypes';

export function getCategorys(){
    return async dispatch => {
        try {
            dispatch(get_categorys_start());
            const url = '/api/category/getCategorys';
            const res = await fetch(url, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': localStorage.getItem('jwt-token')
                },
            });
            const json = await res.json();
            if(res.status === 200){
                dispatch(get_categorys_success(json.categorys));
            }
            if(res.status === 409){
                dispatch(get_categorys_error(json.message));
            }
        } catch (error) {
            console.error(error);
        }
    }
}

export function get_categorys_start(){
    return{
        type: GET_CATEGORYS_START,
        loading: true
    }
}

export function get_categorys_success(categorys){
    return{
        type: GET_CATEGORYS_SUCCESS,
        loading: false,
        categorys: categorys
    }
}

export function get_categorys_error(error){
    return{
        type: GET_CATEGORYS_ERROR,
        loading: false,
        error: error
    }
}