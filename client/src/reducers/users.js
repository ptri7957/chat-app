import { GET_USERS, GET_USERS_ERROR } from "../actions/types";

const initialState = [];

export default (state = initialState, action) => {
  switch (action.type) {
    case GET_USERS:
      return action.payload;
    case GET_USERS_ERROR:
      return [];
    default:
      return state;
  }
};
