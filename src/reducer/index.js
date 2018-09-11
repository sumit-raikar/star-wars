import { combineReducers } from 'redux';
import LoginReducer from './loginReducer';
import DashboardReducer from './dashboardReducer';
export default combineReducers({
    LoginReducer,
    DashboardReducer
});