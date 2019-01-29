import React, { Component } from "react";
import Joi from "joi-browser";
import Form from "./common/form";
import Input from "./common/input";

class LoginForm extends Form {
  state = {
    data: { username: "", password: "" },
    errors: {}
  };

  schema = {
    username: Joi.string()
      .required()
      .label("Username"),
    password: Joi.string()
      .required()
      .label("Password")
  };

  doSubmit = () => {
    // CALL THE SERVER
    // Save
    // Redirect
    console.log("USERNAME", this.state.data.username);
    console.log("PASS", this.state.data.password);
  };

  render() {
    const { data, errors } = this.state;
    return (
      <div>
        <h1>Login</h1>
        <form onSubmit={this.handleSubmit}>
          <Input
            name="username"
            label="Username"
            value={data.username}
            onChange={this.handleChange}
            error={errors.username}
          />
          <Input
            name="password"
            label="Password"
            value={data.password}
            onChange={this.handleChange}
            error={errors.password}
          />
          <button
            disabled={this.validate()}
            type="submit"
            className="btn btn-primary"
          >
            Login
          </button>
        </form>
      </div>
    );
  }
}

export default LoginForm;
