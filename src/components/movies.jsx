import React, { Component } from "react";
import { getMovies } from "../services/fakeMovieService.js";

class Movies extends Component {
  state = {
    movies: getMovies()
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
            <button className="btn btn-danger btn-sm">Delete</button>
          </td>
        </tr>
      );
    });

    return movies;
  };

  render() {
    return (
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
    );
  }
}

export default Movies;
