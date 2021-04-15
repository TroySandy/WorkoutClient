import React, { useState } from "react";
import { Form, FormGroup, Label, Input, Button } from "reactstrap";

const Login = (props) => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  let handleSubmit = (e) => {
    e.preventDefault();
    fetch("http://localhost:4000/user/login", {
      method: "POST",
      body: JSON.stringify({
        //this is where you make the route to the backend, must match it
        username: username,
        passwordhash: password,
      }),
      headers: new Headers({
        "Content-Type": "application/json",
      }),
    })
      .then((response) => response.json())
      .then((data) => {
        props.updateToken(data.sessionToken);
        props.updateUserId(data.user.id);
        // console.log(data);
        // console.log(data.user.id);
      });
    // console.log("hello");
  };

  return (
    <div>
      <h1>Login</h1>
      <Form onSubmit={handleSubmit}>
        <FormGroup>
          <Label htmlFor="username">Username</Label>
          <Input
            onChange={(e) => setUsername(e.target.value)}
            name="username"
            value={username}
          />
          {username === "" ? (
            <div>
              <p>Username Required</p>
            </div>
          ) : null}
        </FormGroup>
        <FormGroup>
          <Label htmlFor="passwordhash">Password</Label>
          <Input
            onChange={(e) => setPassword(e.target.value)}
            name="passwordhash"
            value={password}
          />
        </FormGroup>
        <Button type="submit">Login</Button>
      </Form>
    </div>
  );
};

export default Login;
