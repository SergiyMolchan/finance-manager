import {CREATE_CATEGORY_START, CREATE_CATEGORY_SUCCESS, CREATE_CATEGORY_ERROR} from '../actions/actionsTypes';

export function createCategory(name, type){
    return async dispatch => {
        try {
            dispatch(create_category_start());
            const url = '/api/category/addCategorys';
            const data = {name, type};
            const res = await fetch(url, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': localStorage.getItem('jwt-token')
                },
                body: JSON.stringify(data)
            });
            const json = await res.json();
            if(res.status === 200){
                dispatch(create_category_success(json.categorys));
            }
            if(res.status === 409){
                dispatch(create_category_error(json.message));
            }
        } catch (error) {
            console.error(error);
        }
    }
}

export function create_category_start(){
    return{
        type: CREATE_CATEGORY_START,
        loading: true
    }
}

export function create_category_success(categorys){
    return{
        type: CREATE_CATEGORY_SUCCESS,
        loading: false,
        categorys: categorys
    }
}

export function create_category_error(error){
    return{
        type: CREATE_CATEGORY_ERROR,
        loading: false,
        error: error
    }
}