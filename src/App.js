import React, { Component } from "react";
import Movies from "./components/movies";
import Counters from "./components/counters";
import NavBar from "./components/navbar";
import { Switch, Route, Redirect } from "react-router-dom";
import Customers from "./components/customers";
import Rentals from "./components/rentals";
import NotFound from "./components/notFound";
import AddMovieForm from "./components/addMovieForm";
import MovieDetails from "./components/movieDetails";
import LoginForm from "./components/loginForm";
import RegisterForm from "./components/registerForm";
import { saveMovie } from "./services/fakeMovieService";
import "./App.css";

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

  handleNewMovie = movie => {
    const newMovie = {};
    newMovie.dailyRentalRate = 10;
    newMovie.genre = movie.genre;
    newMovie.title = movie.title;
    newMovie.numberInStock = movie.numberInStock;
    saveMovie(newMovie);
  };

  render() {
    const { counters } = this.state;

    return (
      <React.Fragment>
        <div className="App">
          <header>
            <NavBar totalCounters={this.state.counters.length} />
            <h1>Welcome to Our Rental Video Site</h1>
          </header>
        </div>
        <main className="container">
          <Switch>
            <Route path="/customers" component={Customers} />
            <Route path="/rentals" component={Rentals} />
            <Route
              path="/movies/add"
              render={props => (
                <AddMovieForm addNewMovie={this.handleNewMovie} {...props} />
              )}
            />
            <Route path="/movies/:id" component={MovieDetails} />
            <Route
              path="/movies"
              render={props => (
                <Movies iLikeIt="false" moviesPerPage="5" {...props} />
              )}
            />
            <Route path="/login" component={LoginForm} />
            <Route path="/register" component={RegisterForm} />
            <Route
              path="/"
              render={props => (
                <Movies iLikeIt="false" moviesPerPage="5" {...props} />
              )}
              exact
            />
            <Route path="/not-found" component={NotFound} />
            <Redirect to="/not-found" />
            <Redirect from="/" to="/movies" />
          </Switch>
          {/* <div className="row">
            <Counters
              counters={counters}
              onReset={this.handleReset}
              onDelete={this.handleDelete}
              onIncrement={this.handleIncrement}
              onDecrement={this.handleDecrement}
            />
          </div> */}
        </main>
      </React.Fragment>
    );
  }
}

export default App;
