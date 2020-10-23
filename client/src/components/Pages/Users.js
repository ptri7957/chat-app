import React, { useEffect } from "react";
import PropTypes from "prop-types";
import { getUsers } from "../../actions/users";
import { connect } from "react-redux";
import { Card, Container } from "react-bootstrap";

const Users = ({ getUsers, users }) => {
  useEffect(() => {
    getUsers();
  }, []);

  return (
    <Container className="mt-3 users-container">
      {users.length > 0 &&
        users.map((user) => {
          return (
            <Card className="mb-2">
              <Card.Body>
                <div className="profile-container">
                  <div className="profile-pic">
                    {user.username.toUpperCase()[0]}
                  </div>
                  <div className="name-container">
                    <div className="name-wrapper">
                      <div className="name">{user.username}</div>
                    </div>
                  </div>
                </div>
              </Card.Body>
            </Card>
          );
        })}
    </Container>
  );
};

Users.propTypes = {
  getUsers: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
  users: state.users
});

export default connect(mapStateToProps, { getUsers })(Users);
