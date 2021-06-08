import { combineReducers } from 'redux';

import employeeInformation from './employeeInformation/ducks';

const rootReducer = combineReducers({
    employeeInformation
});

export default rootReducer;
