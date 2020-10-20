import { LOGIN, REGISTER, LOAD_USER, LOGOUT, AUTH_ERROR } from "./types";
import setToken from "../utils/setToken";
import axios from "axios";

export const loadUser = () => async (dispatch) => {
  try {
    if (localStorage.token) {
      setToken(localStorage.token);
    }
    const res = await axios.get("/api/auth");
    dispatch({
      type: LOAD_USER,
      payload: res.data,
    });
  } catch (error) {
    dispatch({
      type: AUTH_ERROR,
    });
  }
};

export const login = (email, password) => async (dispatch) => {
  try {
    const formData = {
      email: email,
      password: password,
    };

    const config = {
      headers: {
        "Content-Type": "application/json",
      },
    };

    const body = JSON.stringify(formData);

    const res = await axios.post("/api/auth", body, config);

    dispatch({
      type: LOGIN,
      payload: res.data,
    });

    dispatch(loadUser());
  } catch (error) {
    dispatch({
      type: AUTH_ERROR,
    });
  }
};

export const register = (username, email, password) => async (dispatch) => {
  try {
    const formData = {
      username: username,
      email: email,
      password: password,
    };

    const config = {
      headers: {
        "Content-Type": "application/json",
      },
    };

    const body = JSON.stringify(formData);

    const res = await axios.post("/api/users", body, config);

    dispatch({
      type: REGISTER,
      payload: res.data,
    });

    dispatch(loadUser());
  } catch (error) {
    dispatch({
      type: AUTH_ERROR,
    });
  }
};

export const logout = () => (dispatch) => {
  dispatch({
    type: LOGOUT,
  });
};
