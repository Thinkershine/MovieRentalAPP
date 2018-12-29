import React, { Component } from "react";

class LikeIt extends Component {
  constructor(props) {
    super(props);
  }

  state = {
    iLikeIt: this.props.iLikeIt
  };

  handleClick = () => {
    this.setState({
      iLikeIt: !this.state.iLikeIt
    });
  };

  renderButton = () => {
    if (this.state.iLikeIt === true) {
      return (
        <button className="btn" onClick={() => this.handleClick()}>
          <i className="fa fa-heart" aria-hidden="true" />
        </button>
      );
    } else {
      return (
        <button className="btn" onClick={() => this.handleClick()}>
          <i className="fa fa-heart-o" aria-hidden="true" />
        </button>
      );
    }
  };

  componentDidUpdate(prevProps, prevState) {
    console.log("DID");
    if (prevState.iLikeIt !== this.state.iLikeIt) {
    }
  }

  render() {
    return <div>{this.renderButton()}</div>;
  }
}

export default LikeIt;
