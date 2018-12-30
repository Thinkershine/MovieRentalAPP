import React, { Component } from "react";
import { getMovies } from "../services/fakeMovieService.js";
import Like from "./common/like";
import Pagination from "./common/pagination";

class Movies extends Component {
  constructor(props) {
    super(props);
    this.state.movies = getMovies();
    this.state.currentPage = 1;
    this.state.itemsToDisplayPerPage = 1;
    this.state.noOfPages = Math.ceil(
      this.state.movies.length / this.state.itemsToDisplayPerPage
    );
    this.state.message =
      "Showing " + this.state.movies.length + " movies in the database.";
  }

  state = {
    message: null,
    movies: null
  };

  renderMovies = () => {
    let moviesCounter = 0;

    let fromIndex = 0;
    if (this.state.currentPage === 1) {
      fromIndex = 0;
    } else {
      fromIndex =
        (this.state.currentPage - 1) * this.state.itemsToDisplayPerPage;
    }
    console.log("From index", fromIndex);

    const filterMoviesWithPagination = this.state.movies.slice(
      fromIndex,
      fromIndex + this.state.itemsToDisplayPerPage
    );
    console.log("PaginatedMovies", filterMoviesWithPagination);

    const movies = filterMoviesWithPagination.map(movie => {
      moviesCounter += 1;

      return (
        <tr key={movie._id}>
          <th scope="row">{moviesCounter}</th>
          <td>{movie.title}</td>
          <td>{movie.genre.name}</td>
          <td>{movie.numberInStock}</td>
          <td>{movie.dailyRentalRate}</td>
          <td>
            {/* <LikeIt iLikeIt={this.props.iLikeIt} /> */}
            <Like liked={movie.liked} onClick={() => this.handleLike(movie)} />
          </td>
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

  handleLike = movie => {
    const movies = [...this.state.movies];
    const index = movies.indexOf(movie);
    movies[index] = { ...movies[index] };
    movies[index].liked = !movies[index].liked;
    this.setState({ movies });
  };

  handleDelete = movie => {
    const { movies } = this.state;
    const allMovies = movies;
    allMovies.splice(movies.lastIndexOf(movie), 1);

    this.updateMessage();

    this.setState({
      movies: allMovies,
      noOfPages: Math.ceil(
        this.state.movies.length / this.state.itemsToDisplayPerPage
      )
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

  handlePagination = pageClicked => {
    console.log("PageClicked", pageClicked);

    if (pageClicked === 0) {
      return;
    }

    if (pageClicked <= this.state.noOfPages && pageClicked !== 0) {
      this.setState({
        currentPage: pageClicked
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
                <th scrop="col">Like</th>
                <th />
              </tr>
            </thead>
            <tbody>{this.renderMovies()}</tbody>
          </table>

          <Pagination
            noOfPages={this.state.noOfPages}
            currentPage={this.state.currentPage}
            onClick={this.handlePagination}
            /* Handle Current Page ?? */
          />
        </React.Fragment>
      );
    }
  }
}

export default Movies;
