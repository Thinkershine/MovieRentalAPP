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

    this.state.message =
      "Showing " + this.state.movies.length + " movies in the database.";
  }

  componentDidMount() {
    this.setState((state, props) => ({
      movies: getMovies(),
      genres: getGenres(),
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
    // Using Filtering Menu

    // Using List Group

    // work on movies
    const movies = [...this.state.movies];
    const moviesByGenre = movies.filter(movie => {
      if (movie.genre.name === genre) {
        return movie;
      } else if (genre === "all-genres") {
        return movie;
      }
    });

    const newNoOfPages = Math.ceil(
      this.state.movies.length / this.state.itemsToDisplayPerPage
    );
    // handle currentPage Change if it doesn't anymore
    let currentPage = this.state.currentPage;
    if (newNoOfPages !== this.state.noOfPages) {
      currentPage = 1;
      // or check which should be the last page ?
    }
    // handle pagination
    this.setState({
      activeGenre: genre,
      filteredMovies: moviesByGenre
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
    console.log("PAGE", page);
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
    let moviesCounter = 0;

    let fromIndex = 0;
    if (this.state.currentPage === 1) {
      fromIndex = 0;
    } else {
      fromIndex =
        (this.state.currentPage - 1) * this.state.itemsToDisplayPerPage;
    }

    const filterMoviesWithPagination = this.state.movies.slice(
      fromIndex,
      fromIndex + this.state.itemsToDisplayPerPage
    );

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

  render() {
    const { length: count } = this.state.movies;
    const {
      itemsToDisplayPerPage,
      currentPage,
      activeGenre,
      movies: allMovies
    } = this.state;

    if (count === 0) return <h3>There Aren't Any Movies in the Database.</h3>;

    // Filter movies
    const filtered = activeGenre
      ? allMovies.filter(m => m.genre._id === activeGenre._id)
      : allMovies;

    console.log("FILTERED", filtered);
    // how to use it? Passing Movie?
    //  const movies = paginate(allMovies, currentPage, pageSize);

    return (
      <div className="container-fluid">
        <div className="row">
          <div className="col-3" style={{ width: 150 }}>
            {/* Filtering Menu - My Way */}
            <FilteringMenu
              title="Genres"
              items={this.state.genres}
              activeItem={this.state.activeGenre}
              onClick={this.handleFiltering}
            />
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
              <tbody>{this.renderMovies()}</tbody>
            </table>

            <Pagination
              noOfPages={this.state.noOfPages}
              currentPage={this.state.currentPage}
              onClick={this.handlePagination}
              /* Handle Current Page ?? */
            />

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
