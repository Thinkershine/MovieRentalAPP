"use-strict";

import React, { Component } from "react";

class Counter extends Component {
  constructor(props) {
    super(props);
    //  this.handleIncrement = this.handleIncrement.bind(this);
    this.state = {
      tags: []
    };
  }

  handleIncrement = () => {
    let products = this.state.tags.concat(this.props.counter.value);
    this.setState({
      tags: products
    });
  };

  handleDecrement = () => {
    const products = this.state.tags.concat(this.props.counter.value);
    this.setState({ tags: products });
  };

  formatCount() {
    const { value } = this.props.counter;
    return value === 0 ? "Zero" : value;
  }

  renderTags() {
    if (this.state.tags.length === 0) return <p>No Tags Availabl!e</p>;
    return this.state.tags.map(tag => <li key={tag}>{tag}</li>);
  }

  render() {
    return (
      <div className="row">
        <div className="col-2">
          <h2>
            <span className={this.getBadgeClasses()}>{this.formatCount()}</span>
          </h2>
        </div>
        <div className="col">
          <div>{this.props.children}</div>

          <button
            style={{ fontSize: 24 }}
            className="btn btn-secondary btn-sm m-2"
            onClick={() => {
              this.props.onIncrement(this.props.counter);
              this.handleIncrement();
            }}
          >
            +
          </button>
          <button
            disabled={this.props.counter.value === 0 ? "disabled" : ""}
            style={{ fontSize: 24 }}
            className="btn btn-secondary btn-sm m-2"
            onClick={() => {
              this.props.onDecrement(this.props.counter);
              this.handleDecrement();
            }}
          >
            -
          </button>
          <button
            style={{ fontSize: 24 }}
            className="btn btn-danger btn-sm"
            onClick={() => this.props.onDelete(this.props.counter.id)}
          >
            Delete
          </button>
          <h2>{this.displayBasket()}</h2>
          {/* <ul>{this.renderTags()}</ul> */}
        </div>
      </div>
    );
  }

  displayBasket = () => {
    if (this.state.tags.length === 0) return "There aren't any products";
    if (this.state.tags.length === 1) return "There is 1 product";
    if (this.state.tags.length >= 2) {
      let currentProductsLength = this.state.tags.length;
      return "There are currently " + currentProductsLength + " products";
    }
  };

  getBadgeClasses() {
    let classes = "badge m-2 badge-";
    classes += this.props.counter.value === 0 ? "warning" : "primary";
    return classes;
  }
}

export default Counter;
