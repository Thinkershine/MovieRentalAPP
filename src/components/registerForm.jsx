import React, { Component } from "react";
import Form from "./common/form";
import Joi from "joi-browser";

class RegisterForm extends Form {
  state = {
    data: { username: "", password: "", name: "" },
    errors: ""
  };

  schema = {
    username: Joi.string()
      .required()
      .min(5)
      .max(30)
      .label("Username"),
    password: Joi.string()
      .required()
      .regex(/^[a-zA-Z0-9]{5,30}$/)
      .label("Password"),
    name: Joi.string()
      .required()
      .max(30)
      .label("Name")
  };

  doSubmit = () => {
    const { data } = this.state;
    const user = {
      username: data.username,
      password: data.password,
      name: data.name
    };
    console.log("Register New user", user);
  };

  render() {
    return (
      <div>
        <h1>Register</h1>
        <form onSubmit={this.handleSubmit}>
          {this.renderInput("username", "Username")}
          {this.renderInput("password", "Password", "password")}
          {this.renderInput("name", "Name")}
          {this.renderButton("register")}
        </form>
      </div>
    );
  }
}

export default RegisterForm;
