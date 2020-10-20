import React, { Fragment } from "react";
import { Nav, Navbar } from "react-bootstrap";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { logout } from "../../actions/auth";

const NavBar = ({ auth, logout }) => {
  return (
    <Navbar expand="lg" bg="light">
      <Navbar.Brand as={Link} to="/">Chat App</Navbar.Brand>
      <Navbar.Toggle aria-controls="basic-navbar-nav" />
      <Navbar.Collapse id="basic-navbar-nav">
        {auth.isAuthenticated ? (
          <Fragment>
            <Nav className="ml-auto">
              <Nav.Link as={Link} to="/chat">
                Chat
              </Nav.Link>
              <Nav.Link as={Link} to="" onClick={logout}>
                Logout
              </Nav.Link>
            </Nav>
          </Fragment>
        ) : (
          <Nav className="ml-auto">
            <Nav.Link as={Link} to="/">
              Login
            </Nav.Link>
          </Nav>
        )}
      </Navbar.Collapse>
    </Navbar>
  );
};

NavBar.propTypes = {
  auth: PropTypes.object.isRequired,
  logout: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
  auth: state.auth,
});

export default connect(mapStateToProps, {logout})(NavBar);
