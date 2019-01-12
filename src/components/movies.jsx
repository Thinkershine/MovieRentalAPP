import React, { Component } from "react";
import { getMovies } from "../services/fakeMovieService.js";
import { getGenres } from "../services/fakeGenreService.js";
import Like from "./common/like";
import Pagination from "./common/pagination";
import { paginate } from "../utils/paginate";
import FilteringMenu from "../components/common/filteringMenu";
import ListGroup from "../components/listGroup";
import Clock from "../components/common/clock";
import PaginationSmall from "../components/common/paginationSmall";

class Movies extends Component {
  state = {};

  constructor(props) {
    super(props);
    this.state.genres = [];
    this.state.activeGenre = "all-genre";
    this.state.movies = [];
    this.state.filteredMovies = this.state.movies;
    this.state.currentPage = 1;
    this.state.noOfPages = 0;
    this.state.itemsToDisplayPerPage = this.props.moviesPerPage;

    this.state.allMoviesBackup = [];

    this.state.message =
      "Showing " + this.state.movies.length + " movies in the database.";
  }

  componentDidMount() {
    this.setState((state, props) => ({
      movies: getMovies(),
      genres: getGenres(),
      allMoviesBackup: getMovies(),
      noOfPages: Math.ceil(getMovies().length / state.itemsToDisplayPerPage)
    }));
  }

  handleLike = movie => {
    const movies = [...this.state.movies];
    const index = movies.indexOf(movie);
    movies[index] = { ...movies[index] };
    movies[index].liked = !movies[index].liked;
    this.setState({ movies });
  };

  handleFiltering = genre => {
    let movies = [];
    if (this.state.allMoviesBackup.length > 0) {
      movies = [...this.state.allMoviesBackup];
    } else {
      movies = [...this.state.movies];
    }

    const moviesByGenre = movies.filter(movie => {
      if (movie.genre.name === genre.name) {
        return movie;
      } else if (genre.name === "all-genres") {
        return movie;
      }
    });

    this.setState({
      activeGenre: genre,
      filteredMovies: moviesByGenre,
      movies: moviesByGenre,
      allMoviesBackup: movies,
      currentPage: 1
    });
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

  handlePagination = pageClicked => {
    const firstPage = 0;

    if (pageClicked === firstPage) {
      return;
    }

    if (pageClicked <= this.state.noOfPages && pageClicked !== 0) {
      this.setState({
        currentPage: pageClicked
      });
    }
  };

  handlePageChange = page => {
    this.setState({ currentPage: page });
  };

  updateMessage = () => {
    const { length: count } = this.state.movies;

    if (count > 0 && this.state.activeGenre === "all-genres") {
      this.setState({
        message: "Showing " + count + " movies in the database."
      });
    } else if (count > 0 && this.state.activeGenre !== "all-genres") {
      this.setState({
        message:
          "Showing " + count + " movies with genre " + this.state.activeGenre
      });
    } else {
      this.setState({
        message: "There Aren't Any Movies in the Database."
      });
    }
  };

  renderMovies = () => {
    const {
      currentPage,
      itemsToDisplayPerPage,
      movies: allMovies
    } = this.state;
    let moviesCounter = 0;

    const paginatedMovies = paginate(
      allMovies,
      currentPage,
      itemsToDisplayPerPage
    );

    const movies = paginatedMovies.map(movie => {
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

  render() {
    const { length: count } = this.state.movies;
    if (count === 0) return <h3>There Aren't Any Movies in the Database.</h3>;

    const {
      itemsToDisplayPerPage,
      currentPage,
      activeGenre,
      movies: allMovies
    } = this.state;
    let moviesCounter = 0;

    // Filter movies
    const filtered = activeGenre
      ? allMovies.filter(m => m.genre._id === activeGenre._id)
      : allMovies;

    console.log("FILTERED", filtered);
    // how to use it? Passing Movie?
    //  const movies = paginate(allMovies, currentPage, pageSize);
    const paginatedMovies = paginate(
      allMovies,
      currentPage,
      itemsToDisplayPerPage
    );

    const movies = paginatedMovies.map(movie => {
      moviesCounter += 1;

      return (
        <tr
          key={movie._id}
          style={{ cursor: "pointer" }}
          onClick={() => this.props.history.push("/movies/" + movie._id)}
        >
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

    return (
      <div className="container-fluid">
        <div className="row">
          <div className="col-3" style={{ width: 150 }}>
            <ListGroup
              items={this.state.genres}
              selectedItem={this.state.activeGenre}
              onItemSelect={this.handleFiltering}
            />
          </div>
          <div className="col-sm">
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
              <tbody>{movies}</tbody>
            </table>

            {/* <Pagination
              noOfPages={this.state.noOfPages}
              currentPage={this.state.currentPage}
              onClick={this.handlePagination}
            /> */}

            <PaginationSmall
              itemsCount={count}
              pageSize={itemsToDisplayPerPage}
              currentPage={currentPage}
              onPageChange={this.handlePageChange}
            />

            <Clock />
          </div>
        </div>
      </div>
    );
  }
}

export default Movies;
