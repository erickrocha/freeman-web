import {combineReducers} from 'redux';

import userReducer from './store/reducers/user'
import applicationReducer from './store/reducers/application'
import contractReducer from "./store/reducers/contract";
import dashboardReducer from "./store/reducers/dashboard";
import projectReducer from "./store/reducers/project";
import reportReducer from "./store/reducers/report";
import managementReducer from "./store/reducers/management";
import entryReducer from "./store/reducers/entry";
import hrReducer from "./store/reducers/hr";
import customerReducer from "./store/reducers/customer";
import supplierReducer from "./store/reducers/supplier";
import orderReducer from "./store/reducers/order";
import paymentReducer from "./store/reducers/payment";
import teamReducer from "./store/reducers/team";

const appReducer = combineReducers({
    contract: contractReducer,
    user: userReducer,
    dashboard: dashboardReducer,
    project: projectReducer,
    report: reportReducer,
    app: applicationReducer,
    management: managementReducer,
    entry: entryReducer,
    hr: hrReducer,
    customer: customerReducer,
    supplier: supplierReducer,
    order: orderReducer,
    payment: paymentReducer,
    team: teamReducer
});

const rootReducer = (state, action) => {
    if (action.type === 'USER_LOGOUT') {
        state = undefined;
    }
    return appReducer(state, action);
};

export default rootReducer;