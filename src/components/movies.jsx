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
          {/* Delete Movie */}
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
    const indexOfMovieToRemove = this.state.movies.lastIndexOf(movie);
    const allMovies = this.state.movies;
    allMovies.splice(indexOfMovieToRemove, 1);

    this.updateMessage();

    this.setState({
      movies: allMovies
    });
  };

  updateMessage = () => {
    if (this.state.movies.length > 0) {
      this.setState({
        message:
          "Showing " + this.state.movies.length + " movies in the database."
      });
    } else {
      this.setState({
        message: "There Aren't Any Movies in the Database."
      });
    }
  };

  render() {
    return (
      <React.Fragment>
        <h3>{this.state.message}</h3>
        {this.state.movies.length !== 0 && (
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
        )}
      </React.Fragment>
    );
  }
}

export default Movies;
