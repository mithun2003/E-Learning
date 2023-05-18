import { combineReducers } from "redux";
import registerSlice from './SignupReducer'
import loginSlice from './LoginReducer'
import adminLoginSlice from './AdminLogin'
const rootReducer = combineReducers({
    register:registerSlice,
    login:loginSlice,
    adminLogin:adminLoginSlice,
})


export default rootReducer;