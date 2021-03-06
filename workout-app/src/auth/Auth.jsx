import React from "react";
import { Container, Row, Col } from "reactstrap";
import Signup from "./Signup.jsx";
import Login from "./Login.jsx";

const Auth = (props) => {
  return (
    <Container className="auth-container">
      <Row>
        <Col md="6">
          <Signup
            updateToken={props.updateToken}
            updateUserId={props.updateUserId}
          />
        </Col>
        <Col md="6" className="login-col">
          <Login
            updateToken={props.updateToken}
            updateUserId={props.updateUserId}
          />
        </Col>
      </Row>
    </Container>
  );
};

export default Auth;
