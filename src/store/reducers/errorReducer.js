const Initial_State = {
  isLoading: false,
  isError: null,
};

export const errorReducer = (state = Initial_State, action) => {
  switch (action.type) {
    case "ON_WAY":
      return { ...state, isLoading: true, isError: null };

    case "SUCCESS":
      return { ...state, isLoading: false, isError: null };

    case "IS_ERROR":
      return { ...state, isLoading: false, isError: action.payload };

    case "LOG_OUT":
      return {};

    default:
      return state;
  }
};
