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

import { login } from "../../actions/auth";
import { connect } from "react-redux";

const Login = ({ auth, login }) => {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const { email, password } = formData;

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    login(email, password);
  };

  if (auth.isAuthenticated) {
    return <Redirect to="/main" />;
  }

  return (
    <Container className="mt-5 auth-form">
      <Card>
        <Card.Body>
          <h1>Login</h1>
          <form onSubmit={(e) => handleSubmit(e)}>
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
            <Button type="submit">Login</Button>
            <div className="mt-5">
              <p>
                Don't have an account? <Link to="/register">Sign up</Link> now.
              </p>
            </div>
          </form>
        </Card.Body>
      </Card>
    </Container>
  );
};

Login.propTypes = {
  login: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
  auth: state.auth,
});

export default connect(mapStateToProps, { login })(Login);
