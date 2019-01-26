import React, { Component } from "react";
import Input from "./common/input";

class LoginForm extends Component {
  state = {};

  username = React.createRef();
  password = React.createRef();

  constructor(props) {
    super(props);
    this.state = { account: { username: "", password: "" } };
  }

  handleSubmit = event => {
    event.preventDefault();

    // CALL THE SERVER
    // Save
    // Redirect

    console.log("USERNAME", this.state.account.username);
    console.log("PASS", this.state.account.password);
  };

  handleChange = ({ currentTarget: input }) => {
    const account = { ...this.state.account };
    account[input.name] = input.value;
    this.setState({ account });
  };

  render() {
    const { account } = this.state;
    return (
      <div>
        <h1>Login</h1>
        <form onSubmit={this.handleSubmit}>
          <Input
            name="username"
            label="Username"
            value={account.username}
            onChange={this.handleChange}
          />
          <Input
            name="password"
            label="Password"
            value={account.password}
            onChange={this.handleChange}
          />
          <button type="submit" className="btn btn-primary">
            Login
          </button>
        </form>
      </div>
    );
  }
}

export default LoginForm;
