import {CREATE_INCOME_OR_EXPENSES_ITEM_START, CREATE_INCOME_OR_EXPENSES_ITEM_SUCCESS, CREATE_INCOME_OR_EXPENSES_ITEM_ERROR} from './actionsTypes';

export function createIncomeOrExpenses(category, type, amount, description){
    return async dispatch => {
        try {
            dispatch(create_incomeOrExpenses_start());
            const url = '/api/financialHistory/addFinancialHistoryItem';
            const date = {category, type, amount, description};
            const res = await fetch(url, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': localStorage.getItem('jwt-token')
                },
                body: JSON.stringify(date)
            });
            const json = await res.json();
            if(res.status === 200){
                dispatch(create_incomeOrExpenses_success(json.financialhistory.reverse()));
            }
            if(res.status === 409){
                dispatch(create_incomeOrExpenses_error(json.message));
            }
        } catch (error) {
            console.error(error);
        }
    }
}

export function create_incomeOrExpenses_start(){
    return{
        type: CREATE_INCOME_OR_EXPENSES_ITEM_START,
    }
}

export function create_incomeOrExpenses_success(item){
    return{
        type: CREATE_INCOME_OR_EXPENSES_ITEM_SUCCESS,
        hystoryList: item
    }
}

export function create_incomeOrExpenses_error(error){
    return{
        type: CREATE_INCOME_OR_EXPENSES_ITEM_ERROR,
        error: error
    }
}