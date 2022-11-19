export const authReducer = (state = {}, action) => {
  switch (action.type) {
    case "SIGN_IN":
      return { ...state, userInfo: action.payload };

    case "SIGN_UP":
      return { ...state, userInfo: action.payload };

    case "LOG_OUT":
      return {};

    default:
      return state;
  }
};

export const getUserReducer = (state = {}, action) => {
  switch (action.type) {
    case "GET_USER":
      return { ...state, myuser: action.payload };

    default:
      return state;
  }
};

export const updateUserReducer = (state = { update: null }, action) => {
  switch (action.type) {
    case "UPDATE_USER":
      return { ...state, update: action.payload };

    case "CLEAR_USER":
      return { update: null };

    default:
      return state;
  }
};

export const jobApplyUserReducer = (state = { applyusers: [] }, action) => {
  switch (action.type) {
    case "APPLY_USERS":
      return { ...state, applyusers: action.payload };

    case "CLEANAPPLY_USERS":
      return { applyusers: [] };

    default:
      return state;
  }
};
