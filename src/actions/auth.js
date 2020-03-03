import {AUTH_START, AUTH_SUCCESS, AUTH_LOGOUT, AUTH_ERROR} from './actionsTypes';

export function Authorization(login, password){
    return async dispatch => {
        dispatch(auth_start());
        const url = '/api/auth/login';
        const data = {login, password};
        try {
            const res = await fetch(url, {
                method: 'POST',
                headers: {
                'Content-Type': 'application/json'
                },
                body: JSON.stringify(data)
            });
            const json = await res.json();
          
            if(res.status === 200){
                const expirationDate = new Date(new Date().getTime() + json.timeLifeOfToken * 1000);
                localStorage.setItem('jwt-token', json.token);
                localStorage.setItem('expirationDate', expirationDate);
                dispatch(auth_saccess(json.token));
                dispatch(autoLogout(json.timeLifeOfToken));
                dispatch(auth_error(null));
            }
            if(res.status === 401 || res.status === 404){
                dispatch(auth_error(json.message));
            }
        } catch (error) {
            console.error(error);
        }
    }
}

export function auth_start(){
    return{
        type: AUTH_START,
        loading: true
    }
}

export function auth_saccess(token){
    return{
        type: AUTH_SUCCESS,
        loading: false,
        token
    }
}

export function auth_error(error){
    return{
        type: AUTH_ERROR,
        loading: false,
        error
    }
}

export function autoLogin(){
    return dispatch => {
        const token = localStorage.getItem('jwt-token');
        if(token){
            const expirationDate = new Date(localStorage.getItem('expirationDate'));
            if(expirationDate <= new Date()){
                dispatch(logout());
            } else {
                dispatch(auth_saccess(token));
                dispatch(autoLogout((expirationDate.getTime() - new Date()) / 1000));
            }
        } else {
            dispatch(logout());
        }
    }
} 

export function logout(){
    localStorage.removeItem('jwt-token');
    localStorage.removeItem('expirationDate');
    return{
        type: AUTH_LOGOUT
    }
}

export function autoLogout(time){
    return dispatch => {
        setTimeout(() => {
            dispatch(logout());
        }, time * 1000);
    }
}