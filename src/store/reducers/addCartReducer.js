export const addCartReducers = (state = { cartItems: null }, action) => {
  switch (action.type) {
    case "ADD_CART":
      return { cartItems: action.payload };

    default:
      return state;
  }
};

export const jobPostReducers = (state = { jobposts: null }, action) => {
  switch (action.type) {
    case "JOB_POST":
      return { jobposts: action.payload };

    case "REMOVE_JOB":
      return {};

    default:
      return state;
  }
};

export const getCartJobReducers = (state = { cartJob: [] }, action) => {
  switch (action.type) {
    case "CART_JOB":
      return { ...state, cartJob: action.payload };

    default:
      return state;
  }
};
