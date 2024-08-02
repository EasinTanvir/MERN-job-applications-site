export const jobReducer = (state = { jobs: [], page: 1 }, action) => {
  switch (action.type) {
    case "FETCH_JOBS":
      return { ...state, jobs: action.payload, page: action.page };

    default:
      return state;
  }
};

export const SinglejobReducer = (state = { jobs: {} }, action) => {
  switch (action.type) {
    case "FETCH_JOB":
      return { ...state, jobs: action.payload };

    default:
      return state;
  }
};

export const postjobReducer = (state = { posts: [] }, action) => {
  switch (action.type) {
    case "POST_JOBS":
      return { ...state, posts: action.payload };

    default:
      return state;
  }
};
