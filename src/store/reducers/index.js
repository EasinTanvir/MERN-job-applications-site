import { configureStore } from "@reduxjs/toolkit";
import {
  addCartReducers,
  getCartJobReducers,
  jobPostReducers,
} from "./addCartReducer";
import {
  authReducer,
  getUserReducer,
  jobApplyUserReducer,
  updateUserReducer,
} from "./authReducer";
import { errorReducer } from "./errorReducer";
import { jobReducer, postjobReducer, SinglejobReducer } from "./jobReducer";

const userInfos = localStorage.getItem("userData")
  ? JSON.parse(localStorage.getItem("userData"))
  : null;

const Initial_State = {
  auth: { userInfo: userInfos },
};

export const store = configureStore({
  reducer: {
    auth: authReducer,
    myuser: getUserReducer,
    alljobs: jobReducer,
    singleJob: SinglejobReducer,
    errors: errorReducer,
    cart: addCartReducers,
    jobpost: jobPostReducers,
    cartjobs: getCartJobReducers,
    updateUser: updateUserReducer,
    postJob: postjobReducer,
    applyuser: jobApplyUserReducer,
  },
  preloadedState: Initial_State,
});
