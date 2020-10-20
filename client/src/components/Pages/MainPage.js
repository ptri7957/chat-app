import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";
import { Card, Row } from "react-bootstrap";
import Chat from "./ChatBox";
import { getConversations } from "../../actions/messages";
import { connect } from "react-redux";

const MainPage = ({
  auth: { user },
  messages: { conversations },
  getConversations,
}) => {
  const [userId, setUserId] = useState("");


  useEffect(() => {
    getConversations();
  }, []);


  const handleClick = (id) => {
    setUserId(id.toString());
    console.log(id)
  };

  return (
    <div className="container-fluid">
      <Row className="no-gutters">
        <div className="col-lg-4 col-md-4">
          <Card>
            <Card.Body className="mt-2 conversation-container">
                {conversations.length > 0 && (
                    conversations.map(conversation => (
                        <div onClick={() => handleClick(conversation.participant._id)} className="profile-container">
                            <div className="profile-pic">{conversation.participant.username.toUpperCase()[0]}</div>
                            <div className="name-container">{conversation.participant.username}</div>
                        </div>
                    ))
                )}
            </Card.Body>
          </Card>
        </div>
        <div className="col-lg-8 col-md-8">
          {userId !== "" ? (
            <Chat userId={userId} />
          ) : (
            <div>Click on a conversation</div>
          )}
        </div>
      </Row>
    </div>
  );
};

MainPage.propTypes = {
  auth: PropTypes.object.isRequired,
  messages: PropTypes.object.isRequired,
  getConversations: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
  auth: state.auth,
  messages: state.messages,
});

export default connect(mapStateToProps, { getConversations })(MainPage);
