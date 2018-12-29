import React, { Component } from "react";
import { getMovies } from "../services/fakeMovieService.js";

class Movies extends Component {
  constructor(props) {
    super(props);
    this.state.movies = getMovies();
    this.state.message =
      "Showing " + this.state.movies.length + " movies in the database.";
  }

  state = {
    message: null,
    movies: null
  };

  renderMovies = () => {
    let moviesCounter = 0;

    const movies = this.state.movies.map(movie => {
      moviesCounter += 1;

      return (
        <tr key={movie._id}>
          <th scope="row">{moviesCounter}</th>
          <td>{movie.title}</td>
          <td>{movie.genre.name}</td>
          <td>{movie.numberInStock}</td>
          <td>{movie.dailyRentalRate}</td>

          <td>
            <button
              onClick={() => this.handleDelete(movie)}
              className="btn btn-danger btn-sm"
            >
              Delete
            </button>
          </td>
        </tr>
      );
    });

    return movies;
  };

  handleDelete = movie => {
    const { movies } = this.state;
    const allMovies = movies;
    allMovies.splice(movies.lastIndexOf(movie), 1);

    this.updateMessage();

    this.setState({
      movies: allMovies
    });
  };

  updateMessage = () => {
    const { length: count } = this.state.movies;

    if (count > 0) {
      this.setState({
        message: "Showing " + count + " movies in the database."
      });
    } else {
      this.setState({
        message: "There Aren't Any Movies in the Database."
      });
    }
  };

  render() {
    const { length: count } = this.state.movies;

    if (count === 0) {
      return <h3>There Aren't Any Movies in the Database.</h3>;
    } else {
      return (
        <React.Fragment>
          <h3>{"Showing " + count + "movies in the database."}</h3>

          <table className="table">
            <thead>
              <tr>
                <th scope="col">#</th>
                <th scope="col">Title</th>
                <th scope="col">Genre</th>
                <th scope="col">Stock</th>
                <th scope="col">Rate</th>
                <th />
              </tr>
            </thead>
            <tbody>{this.renderMovies()}</tbody>
          </table>
        </React.Fragment>
      );
    }
  }
}

export default Movies;