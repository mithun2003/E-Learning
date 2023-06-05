import { combineReducers } from "redux";
import registerSlice from './SignupReducer'
import loginSlice from './LoginReducer'
import adminLoginSlice from './AdminLogin'
import courseSlice from './CourseReducer'
const rootReducer = combineReducers({
    register:registerSlice,
    login:loginSlice,
    adminLogin:adminLoginSlice,
    course: courseSlice,
})


export default rootReducer;