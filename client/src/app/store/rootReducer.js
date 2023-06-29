import { combineReducers } from "redux";
import modalReducer from "./features/modalSlice";
import postReducer from "./features/postSlice";
import userReducer from "./features/userSlice";
import usersReducer from "./features/usersSlice";

export default combineReducers({
    user: userReducer,
    modal: modalReducer,
    post: postReducer,
    users: usersReducer
});
