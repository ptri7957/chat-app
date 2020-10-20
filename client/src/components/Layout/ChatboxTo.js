import React from "react";
import PropTypes from "prop-types";

const ChatboxTo = ({ message }) => {
  return <div className="recipient-message message-box">{message}</div>;
};

ChatboxTo.propTypes = {
  message: PropTypes.string.isRequired,
};

export default ChatboxTo;
