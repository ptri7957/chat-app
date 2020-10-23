import React from 'react'

const ConversationItem = ({userId, username, lastMessage, handleClick}) => {
    return (
        <div className="profile-container" onClick={() => handleClick(userId, username)}>
          <div className="profile-pic">{username.toUpperCase()[0]}</div>
          <div className="name-container">
            <div className="name-wrapper">
              <div className="name">{username}</div>
              <div className="last-message">{lastMessage && lastMessage.substring(0, 50)}</div>
            </div>
          </div>
        </div>
    )
}

export default ConversationItem
