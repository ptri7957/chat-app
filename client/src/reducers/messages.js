import {
  GET_MESSAGES,
  GET_CONVERSATIONS,
  MESSAGES_ERROR,
  POST_MESSAGE,
  GET_CONVERSATION,
} from "../actions/types";

const initialState = {
  conversations: [],
  conversation: [],
  messages: [],
  loading: true,
};

export default (state = initialState, action) => {
  switch (action.type) {
    case GET_MESSAGES:
      return {
        ...state,
        messages: action.payload,
        loading: false,
      };
    case GET_CONVERSATIONS:
      return {
        ...state,
        conversations: action.payload,
        loading: false,
      };
    case GET_CONVERSATION:
      return {
        ...state,
        conversation: action.payload,
        loading: false,
      };
    case POST_MESSAGE:
      return {
        ...state,
        messages: [...state.messages, action.payload],
        loading: false,
      };
    case MESSAGES_ERROR:
      return {
        ...state,
        messages: [],
        conversations: [],
        conversation: [],
        loading: false,
      };
    default:
      return state;
  }
};
