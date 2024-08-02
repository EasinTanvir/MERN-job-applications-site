import axios from "axios";
import history from "../../history";

export const Fetch_Jobs = (search) => async (dispatch) => {
  try {
    dispatch({ type: "ON_WAY" });
    const { data } = await axios.get(
      process.env.REACT_APP_PATH + `/api/job?${search}`
    );
    dispatch({ type: "FETCH_JOBS", payload: data.jobs, page: data.page });
    dispatch({ type: "SUCCESS" });
  } catch (err) {
    dispatch({ type: "IS_ERROR", payload: err.response.data.message });
  }
};

export const Fetch_Jobs_Id = (id) => async (dispatch) => {
  try {
    dispatch({ type: "ON_WAY" });
    const { data } = await axios.get(
      process.env.REACT_APP_PATH + `/api/job/${id}`
    );
    dispatch({ type: "FETCH_JOB", payload: data });
    dispatch({ type: "SUCCESS" });
  } catch (err) {
    dispatch({ type: "IS_ERROR", payload: err.response.data.message });
  }
};

export const Sign_In = (userData) => async (dispatch) => {
  try {
    dispatch({ type: "ON_WAY" });
    const { data } = await axios.post(
      process.env.REACT_APP_PATH + `/api/user/signin`,
      userData
    );
    dispatch({ type: "SIGN_IN", payload: data });
    localStorage.setItem("userData", JSON.stringify(data));
    dispatch({ type: "SUCCESS" });
    dispatch({ type: "CLEAR_USER" });
    history.push("/");
  } catch (err) {
    dispatch({ type: "IS_ERROR", payload: err.response.data.message });
  }
};

export const Sign_Up = (userData) => async (dispatch) => {
  try {
    dispatch({ type: "ON_WAY" });
    const { data } = await axios.post(
      process.env.REACT_APP_PATH + `/api/user/signup`,
      userData
    );
    dispatch({ type: "SIGN_UP", payload: data });
    localStorage.setItem("userData", JSON.stringify(data));
    dispatch({ type: "SUCCESS" });
    history.push("/");
  } catch (err) {
    dispatch({ type: "IS_ERROR", payload: err.response.data.message });
  }
};

export const Add_Cart_Items = (id) => async (dispatch) => {
  try {
    dispatch({ type: "ON_WAY" });
    const { data } = await axios.get(
      process.env.REACT_APP_PATH + `/api/job/${id}`
    );
    dispatch({
      type: "ADD_CART",
      payload: { job: data._id, title: data.title, image: data.image },
    });

    dispatch({ type: "SUCCESS" });
  } catch (err) {
    dispatch({ type: "IS_ERROR", payload: err.response.data.message });
  }
};

export const Create_JobPost =
  (jobId, recData) => async (dispatch, getState) => {
    const { userInfo } = getState().auth;
    try {
      dispatch({ type: "ON_WAY" });
      const { data } = await axios.post(
        process.env.REACT_APP_PATH + `/api/cart/job/${jobId}`,
        recData,
        { headers: { Authorization: "Bearer " + userInfo.token } }
      );
      dispatch({
        type: "JOB_POST",
        payload: data,
      });

      dispatch({ type: "SUCCESS" });
      history.push("/job");
    } catch (err) {
      dispatch({ type: "IS_ERROR", payload: err.response.data.message });
    }
  };

export const Create_NewPosition = (recData) => async (dispatch, getState) => {
  const { userInfo } = getState().auth;
  try {
    dispatch({ type: "ON_WAY" });
    await axios.post(process.env.REACT_APP_PATH + `/api/job`, recData, {
      headers: { Authorization: "Bearer " + userInfo.token },
    });
    dispatch({
      type: "NEW_JOB",
    });

    dispatch({ type: "SUCCESS" });
    history.push("/job");
  } catch (err) {
    dispatch({ type: "IS_ERROR", payload: err.response.data.message });
  }
};

export const getCart_Job = () => async (dispatch, getState) => {
  const { userInfo } = getState().auth;
  try {
    dispatch({ type: "ON_WAY" });
    const { data } = await axios.get(
      process.env.REACT_APP_PATH + `/api/cart/job`,
      { headers: { Authorization: "Bearer " + userInfo.token } }
    );
    dispatch({
      type: "CART_JOB",
      payload: data,
    });

    dispatch({ type: "SUCCESS" });
  } catch (err) {
    dispatch({ type: "IS_ERROR", payload: err.response.data.message });
  }
};

export const get_User = () => async (dispatch, getState) => {
  const { userInfo } = getState().auth;
  try {
    dispatch({ type: "ON_WAY" });
    const { data } = await axios.get(process.env.REACT_APP_PATH + `/api/user`, {
      headers: { Authorization: "Bearer " + userInfo.token },
    });
    dispatch({
      type: "GET_USER",
      payload: data,
    });

    dispatch({ type: "SUCCESS" });
  } catch (err) {
    dispatch({ type: "IS_ERROR", payload: err.response.data.message });
  }
};

export const update_User = (recData) => async (dispatch, getState) => {
  const { userInfo } = getState().auth;
  try {
    dispatch({ type: "ON_WAY" });
    const { data } = await axios.patch(
      process.env.REACT_APP_PATH + `/api/user`,
      recData,
      {
        headers: { Authorization: "Bearer " + userInfo.token },
      }
    );
    dispatch({
      type: "UPDATE_USER",
      payload: data.message,
    });

    dispatch({ type: "SUCCESS" });
  } catch (err) {
    dispatch({ type: "IS_ERROR", payload: err.response.data.message });
  }
};

export const myPost_Jobs = () => async (dispatch, getState) => {
  const { userInfo } = getState().auth;
  try {
    dispatch({ type: "ON_WAY" });
    const { data } = await axios.get(
      process.env.REACT_APP_PATH + `/api/job/post/job`,

      {
        headers: { Authorization: "Bearer " + userInfo.token },
      }
    );
    dispatch({
      type: "POST_JOBS",
      payload: data,
    });

    dispatch({ type: "SUCCESS" });
    dispatch({ type: "CLEANAPPLY_USERS" });
  } catch (err) {
    dispatch({ type: "IS_ERROR", payload: err.response.data.message });
  }
};

export const application_UserDetails = (id) => async (dispatch, getState) => {
  const { userInfo } = getState().auth;
  try {
    dispatch({ type: "ON_WAY" });
    const { data } = await axios.get(
      process.env.REACT_APP_PATH + `/api/job/post/job/applyuser/${id}`,

      {
        headers: { Authorization: "Bearer " + userInfo.token },
      }
    );
    dispatch({
      type: "APPLY_USERS",
      payload: data,
    });

    dispatch({ type: "SUCCESS" });
  } catch (err) {
    dispatch({ type: "IS_ERROR", payload: err.response.data.message });
  }
};

export const update_CartItems = (id, recData) => async (dispatch, getState) => {
  const { userInfo } = getState().auth;
  try {
    dispatch({ type: "ON_WAY" });
    const { data } = await axios.patch(
      process.env.REACT_APP_PATH + `/api/cart/job/${id}`,
      recData,

      {
        headers: { Authorization: "Bearer " + userInfo.token },
      }
    );
    dispatch({
      type: "CARTUPDATE_USERS",
      payload: data,
    });

    dispatch({ type: "SUCCESS" });
    history.push("/mypostjob");
  } catch (err) {
    dispatch({ type: "IS_ERROR", payload: err.response.data.message });
  }
};

export const remove_CartItems = (id, recData) => async (dispatch, getState) => {
  const { userInfo } = getState().auth;
  try {
    dispatch({ type: "ON_WAY" });
    const { data } = await axios.patch(
      process.env.REACT_APP_PATH + `/api/cart/job/reject/${id}`,
      recData,

      {
        headers: { Authorization: "Bearer " + userInfo.token },
      }
    );
    dispatch({
      type: "CARTREMOVE_USERS",
      payload: data,
    });

    dispatch({ type: "SUCCESS" });
    history.push("/mypostjob");
  } catch (err) {
    dispatch({ type: "IS_ERROR", payload: err.response.data.message });
  }
};

export const Log_Out = () => {
  return {
    type: "LOG_OUT",
  };
};
