import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";
import io from "socket.io-client";
import Chat from "../Layout/ChatBox";
import { getConversations } from "../../actions/messages";
import { connect } from "react-redux";
import ConversationItem from "../Layout/ConversationItem";
import ChatName from "../Layout/ChatName";

const MainPage = ({ messages: { conversations }, getConversations }) => {
  const [userId, setUserId] = useState("");
  const [username, setUsername] = useState("");
  const [message, setMessage] = useState("");

  useEffect(() => {
    getConversations();
  }, [message]);

  useEffect(() => {
    const socket = io();
    socket.on("message", (message) => {
      setMessage(message);
    });

    return () => {
      socket.removeListener("message");
    }
  }, []);

  const handleClick = (id, username) => {
    setUserId(id.toString());
    setUsername(username);
    console.log(id);
  };

  return (
    <div className="main-container">
      <div className="conversation-container">
        {conversations.length > 0 &&
          conversations.map((conversation) => (
            <ConversationItem
              userId={conversation.participant._id}
              username={conversation.participant.username}
              handleClick={handleClick}
              lastMessage={conversation.last_message}
            />
          ))}
      </div>
      {/*Chat container*/}
      <div className="chat-container">
        <div className="chat-name">
          <ChatName username={username} />
        </div>
        {userId !== "" ? (
          <Chat userId={userId} username={username} />
        ) : (
          <div className="default-message">Click on a conversation</div>
        )}
      </div>
    </div>
  );
};

MainPage.propTypes = {
  messages: PropTypes.object.isRequired,
  getConversations: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
  messages: state.messages,
});

export default connect(mapStateToProps, { getConversations })(MainPage);
