import {combineReducers} from 'redux';
import auth from './auth';
import registration from './registration';
import financialHistory from './financialHistory';

export default combineReducers({
    auth, registration, financialHistory
});