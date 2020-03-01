import {combineReducers} from 'redux';
import auth from './auth';
import registration from './registration';
import financialHistory from './financialHistory';
import categorys from './categorys';

export default combineReducers({
    auth, registration, financialHistory, categorys
});