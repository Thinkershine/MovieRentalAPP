import React, { Component } from "react";
import PropTypes from "prop-types";

class Pagination extends Component {
  state = {};

  renderPaginationButtons = () => {
    const { currentPage, noOfPages } = this.props;

    let pages = [];

    for (let i = 1; i < noOfPages + 1; i += 1) {
      pages.push(
        <li
          key={i}
          className={currentPage === i ? "page-item active" : "page-item"}
        >
          <i className="page-link" onClick={() => this.props.onClick(i)}>
            {i}
          </i>
        </li>
      );
    }

    return pages;
  };

  render() {
    if (this.props.noOfPages === 1) {
      return null;
    } else {
      return (
        <nav>
          <ul className="pagination">
            {/* Previous Button */}
            <li className="page-item">
              <i
                className={
                  this.props.currentPage === 1
                    ? "page-link disabled"
                    : "page-link"
                }
                tabIndex={this.props.currentPage === 1 ? "-1" : ""}
                aria-label="Previous"
                onClick={() => this.props.onClick(this.props.currentPage - 1)}
              >
                <span aria-hidden="true">&laquo;</span>
                <span className="sr-only">Previous</span>
              </i>
            </li>

            {this.renderPaginationButtons()}

            {/* Next Button */}
            <li className="page-item">
              <i
                className={
                  this.props.currentPage === this.props.noOfPages
                    ? "page-link disabled"
                    : "page-link"
                }
                aria-label="Next"
                onClick={() => this.props.onClick(this.props.currentPage + 1)}
              >
                <span aria-hidden="true">&raquo;</span>
                <span className="sr-only">Next</span>
              </i>
            </li>
          </ul>
        </nav>
      );
    }
  }
}

Pagination.propTypes = {
  currentPage: PropTypes.number.isRequired,
  noOfPages: PropTypes.number.isRequired,
  onClick: PropTypes.func.isRequired
};

export default Pagination;
