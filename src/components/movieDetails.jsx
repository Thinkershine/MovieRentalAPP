import React, { Component } from "react";

class MovieDetails extends Component {
  state = {};
  render() {
    const movieID = this.props.match.params.id;
    return (
      <React.Fragment>
        <h2>A Movie ID: {movieID}</h2>
        <button
          className="btn btn-secondary"
          onClick={() => this.props.history.push("/movies")}
        >
          Save
        </button>
      </React.Fragment>
    );
  }
}

export default MovieDetails;
