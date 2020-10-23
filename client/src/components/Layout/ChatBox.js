import React, { useState, useEffect, Fragment, useRef } from "react";
import PropTypes from "prop-types";
import { FormControl, FormGroup } from "react-bootstrap";
import { connect } from "react-redux";
import io from "socket.io-client";

import ChatboxFrom from "./ChatboxFrom";
import ChatboxTo from "./ChatboxTo";
import { getMessages, postMessage } from "../../actions/messages";

const Chat = ({ auth, messages, getMessages, postMessage, userId }) => {
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
    <Fragment>
      <div className="chat-box-container">
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
      </div>
      <div className="chat-input">
        <form onSubmit={(e) => handleSubmit(e)}>
          <FormGroup>
            <FormControl
              type="text"
              ref={chatRef}
              placeholder="Type a message..."
              id="message-input"
            ></FormControl>

            <button className="btn btn-primary invisible" type="submit">
              Send
            </button>
          </FormGroup>
        </form>
      </div>
    </Fragment>
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
