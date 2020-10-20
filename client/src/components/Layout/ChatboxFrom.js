import React from "react";
import PropTypes from "prop-types";

const ChatboxFrom = ({ message }) => {
  return <div className="your-message message-box">{message}</div>;
};

ChatboxFrom.propTypes = {
  message: PropTypes.string.isRequired,
};

export default ChatboxFrom;
