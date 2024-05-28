import { combineReducers, configureStore } from "@reduxjs/toolkit";
import designationReducer from "../features/designation/designationSlice";
import stateReducer from "../features/states/stateSlice";
import userReducer from "../features/user/userSlice";
import partyTypeReducer from "../features/partyType/partyTypeSlice";
import currentUserReducer from "../features/currentUser/currentUserSlice";
import companyProfileReducer from "../features/companyProfile/companyProfileSlice";

const reducers = combineReducers({
    designation: designationReducer,
    state: stateReducer,
    users: userReducer,
    partyType: partyTypeReducer,
    currentUser: currentUserReducer,
    companyProfile: companyProfileReducer,
});

export const store = configureStore({
    reducer: reducers,
});