import {REGISTRATION_START, REGISTRATION_SUCCESS, REGISTRATION_ERROR, REGISTRATION_NEW} from './actionsTypes';

export function registration(login, password, repeatPassword){
    return async dispatch => {
        const url = '/api/auth/registration';
        const data = {login, password, repeatPassword};
        dispatch(registration_start());
        try {
            const res = await fetch(url, {
                method: 'POST',
                headers: {
                  'Content-Type': 'application/json'
                },
                body: JSON.stringify(data)
              });
              const json = await res.json();
              if(res.status === 201){
                dispatch(registration_saccess());
                dispatch(registration_error(null));
                console.info(json.message)
              }
              if(res.status === 409){
                dispatch(registration_error(json.message));
              }
        } catch (error) {
            dispatch(registration_error(error));
            console.error(error);
        }
    }
}

export function registration_start(){
    return{
        type: REGISTRATION_START,
        loading: true
    }
}

export function registration_saccess(){
    return{
        type: REGISTRATION_SUCCESS,
        loading: false,
        registered: true
    }
}

export function registration_error(error){
    return{
        type: REGISTRATION_ERROR,
        loading: false,
        error: error,
    }
}

export function registration_new(){
    return{
        type: REGISTRATION_NEW,
        registered: false
    }
}