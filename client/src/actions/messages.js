import {
  GET_MESSAGES,
  GET_CONVERSATIONS,
  GET_CONVERSATION,
  MESSAGES_ERROR,
  POST_MESSAGE,
} from "./types";
import axios from "axios";

export const getMessages = (userId) => async (dispatch) => {
  try {
    const res = await axios.get(
      `/api/messages/conversation/query?to=${userId}`
    );
    dispatch({
      type: GET_MESSAGES,
      payload: res.data,
    });
  } catch (error) {
    dispatch({
      type: MESSAGES_ERROR,
    });
  }
};

export const getConversations = () => async (dispatch) => {
  try {
    const res = await axios.get("/api/messages/conversations");
 
    dispatch({
      type: GET_CONVERSATIONS,
      payload: res.data,
    });
  } catch (error) {
    dispatch({
      type: MESSAGES_ERROR,
    });
  }
};

export const getConversation = (recipientId) => async (dispatch) => {
  try {
    const res = await axios.get(`/api/messages/conversation?to=${recipientId}`);
    dispatch({
      type: GET_CONVERSATION,
      payload: res.data,
    });
  } catch (error) {
    dispatch({
      type: MESSAGES_ERROR,
    });
  }
};

export const postMessage = (userId, message) => async (dispatch) => {
  try {
    const payload = {
      message: message,
    };

    const config = {
      headers: {
        "Content-Type": "application/json",
      },
    };

    const body = JSON.stringify(payload);

    const res = await axios.post(
      `/api/messages/message?to=${userId}`,
      body,
      config
    );

    dispatch({
      type: POST_MESSAGE,
      payload: res.data,
    });
  } catch (error) {
    dispatch({
      type: MESSAGES_ERROR,
    });
  }
};
