import React, { Component } from "react";
import "./App.css";
import Movies from "./components/movies";
import Counters from "./components/counters";
import NavBar from "./components/navbar";

class App extends Component {
  state = {
    counters: [
      { id: 1, value: 10 },
      { id: 2, value: 0 },
      { id: 3, value: 0 },
      { id: 4, value: 10 }
    ]
  };

  handleReset = () => {
    const counters = this.state.counters.map(counter => {
      counter.value = 0;
      return counter;
    });
    this.setState({ counters });
  };

  handleDelete = counterID => {
    const counters = this.state.counters.filter(c => c.id !== counterID);
    this.setState({ counters });
  };

  handleIncrement = counter => {
    const counters = [...this.state.counters];
    const index = counters.indexOf(counter);
    counters[index] = { ...counter };
    counters[index].value += 1;
    this.setState({ counters });
  };

  handleDecrement = counter => {
    const counters = [...this.state.counters];
    const index = counters.indexOf(counter);

    if (counters[index].value > 0) {
      counters[index].value -= 1;
      this.setState({ counters });
    } else {
      return;
    }
  };

  render() {
    const { counters } = this.state;

    return (
      <React.Fragment>
        <div className="App">
          <header>
            <h1>Welcome to Our Rental Video Site</h1>
            <NavBar totalCounters={this.state.counters.length} />
          </header>
        </div>
        <main className="container">
          <Counters
            counters={counters}
            onReset={this.handleReset}
            onDelete={this.handleDelete}
            onIncrement={this.handleIncrement}
            onDecrement={this.handleDecrement}
          />
          <Movies iLikeIt="false" />
        </main>
      </React.Fragment>
    );
  }
}

export default App;
