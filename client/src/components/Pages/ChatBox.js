import React, { useState, useEffect, Fragment, useRef } from "react";
import PropTypes from "prop-types";
import { FormControl, Button, InputGroup } from "react-bootstrap";
import { connect } from "react-redux";
import io from "socket.io-client";

import ChatboxFrom from "../Layout/ChatboxFrom";
import ChatboxTo from "../Layout/ChatboxTo";
import {
  getMessages,
  postMessage,
} from "../../actions/messages";
import UserCard from "../Layout/UserCard";

const Chat = ({
  auth,
  messages,
  match,
  getMessages,
  postMessage,
  userId
}) => {
  const [chatMessage, setChatMessage] = useState("");
  const chatRef = useRef();
  const messageRef = useRef();

  const scrollToBottom = () => {
    messageRef.current.scrollTop = messageRef.current.scrollHeight;
  };

  useEffect(() => {
    getMessages(userId);
  }, [getMessages, chatMessage, userId]);

  useEffect(() => {
    const socket = io();
    socket.on("message", (message) => {
      setChatMessage(message);
      scrollToBottom();
    });

    return () => {
      socket.removeListener("message");
    };
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    postMessage(userId, chatRef.current.value);
    chatRef.current.value = "";
  };

  return (
    <div className="mt-2 chat-box-container">
      {/* {auth.user !== null && messages.conversation.length > 0 && (
        <UserCard
          recipient={
            messages.conversation[0].participants.filter(
              (participant) =>
                participant._id.toString() !== auth.user.id.toString()
            )[0]
          }
        />
      )} */}
      <div className="chat-box" ref={messageRef}>
        {auth.user !== null && messages.messages.length > 0 ? (
          messages.messages.map((message) => {
            if (message.from === auth.user.id) {
              return (
                <ChatboxFrom
                  key={message.message._id}
                  message={message.message}
                />
              );
            } else {
              return (
                <ChatboxTo
                  key={message.message._id}
                  message={message.message}
                />
              );
            }
          })
        ) : (
          <Fragment></Fragment>
        )}
      </div>
      <div className="chat-input">
        <form onSubmit={(e) => handleSubmit(e)}>
          <InputGroup>
            <FormControl
              type="text"
              ref={chatRef}
              placeholder="Type a message..."
              id="message-input"
            ></FormControl>
            <InputGroup.Append>
              <Button className="primary" type="submit">
                Send
              </Button>
            </InputGroup.Append>
          </InputGroup>
        </form>
      </div>
    </div>
  );
};

Chat.propTypes = {
  getMessages: PropTypes.func.isRequired,
  postMessage: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
  auth: state.auth,
  messages: state.messages,
});

export default connect(mapStateToProps, {
  getMessages,
  postMessage,
})(Chat);
