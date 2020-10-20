import React, { useState } from "react";
import { Redirect, Link } from "react-router-dom";
import PropTypes from "prop-types";
import {
  Container,
  Card,
  FormGroup,
  FormControl,
  Button,
} from "react-bootstrap";

import { register } from "../../actions/auth";
import { connect } from "react-redux";

const Register = ({ auth, register }) => {
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
  });

  const { username, email, password } = formData;

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    register(username, email, password);
  };

  if (auth.isAuthenticated) {
    return <Redirect to="/chat" />;
  }

  return (
    <Container className="mt-5 auth-form">
      <Card>
        <Card.Body>
          <h1>Register</h1>
          <form onSubmit={(e) => handleSubmit(e)}>
            <FormGroup>
              <label>Username</label>
              <FormControl
                type="text"
                name="username"
                value={username}
                onChange={(e) => handleChange(e)}
              />
            </FormGroup>
            <FormGroup>
              <label>Email</label>
              <FormControl
                type="text"
                name="email"
                value={email}
                onChange={(e) => handleChange(e)}
              />
            </FormGroup>
            <FormGroup>
              <label>Password</label>
              <FormControl
                type="password"
                name="password"
                value={password}
                onChange={(e) => handleChange(e)}
              />
            </FormGroup>
            <Button type="submit">Register</Button>
          </form>
          <div className="mt-5">
            <p>
              Already have an account? <Link to="/">Sign in</Link> now.
            </p>
          </div>
        </Card.Body>
      </Card>
    </Container>
  );
};

Register.propTypes = {
  register: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
  auth: state.auth,
});

export default connect(mapStateToProps, { register })(Register);
