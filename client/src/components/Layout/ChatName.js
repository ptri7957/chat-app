import React from "react";

const ChatName = ({ username }) => {
  return (
    <div className="chat-name-header">
      {username}
    </div>
  );
};

export default ChatName;
