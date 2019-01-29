import React, { Component } from "react";
import Form from "./common/form";
import Joi from "joi-browser";
import { getGenres } from "../services/fakeGenreService";

class AddMovieForm extends Form {
  state = {
    data: { title: "", genre: "", numberInStock: "", rate: "" },
    errors: "",
    genres: getGenres()
  };

  schema = {
    title: Joi.string()
      .required()
      .min(5)
      .max(30)
      .label("Title"),
    genre: Joi.string()
      .required()
      .label("Genre"),
    numberInStock: Joi.number()
      .integer()
      .min(1)
      .max(30)
      .label("In Stock"),
    rate: Joi.number()
      .min(1)
      .max(10)
      .label("Rate")
  };

  doSubmit = () => {
    const movie = this.state.data;
    this.props.addNewMovie(movie);
  };

  renderGenresOptions = () => {
    const options = this.state.genres.map(genre => {
      return (
        <option key={genre._id} value={genre._id}>
          {genre.name}
        </option>
      );
    });
    return options;
  };

  render() {
    return (
      <div>
        <h1>Add New Movie</h1>
        <form onSubmit={this.handleSubmit}>
          {this.renderInput("title", "Title")}
          <select
            className="form-control"
            onChange={this.handleChange}
            name="genre"
          >
            {this.renderGenresOptions()}
          </select>
          {this.renderInput("numberInStock", "In Stock")}
          {this.renderInput("rate", "Rate")}

          {this.renderButton("Save")}
        </form>
      </div>
    );
  }
}

export default AddMovieForm;
