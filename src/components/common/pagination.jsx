import React, { Component } from "react";

class Pagination extends Component {
  state = {};

  renderPaginationButtons = () => {
    console.log("No of Pages", this.state.noOfPages);

    let pages = [];

    for (let i = 1; i < this.props.noOfPages + 1; i += 1) {
      pages.push(
        <li
          className={
            this.props.currentPage === i ? "page-item active" : "page-item"
          }
        >
          <a href="#" className="page-link">
            {i}
          </a>
        </li>
      );
    }
    console.log("pages", pages);
    return pages;
  };

  render() {
    return (
      <nav>
        <ul className="pagination">
          {/* Previous Button */}
          <li className="page-item">
            <a
              href="#"
              className="page-link disabled"
              tabIndex="-1"
              aria-label="Previous"
            >
              <span aria-hidden="true">&laquo;</span>
              <span className="sr-only">Previous</span>
            </a>
          </li>

          {this.renderPaginationButtons()}

          {/* Next Button */}
          <li className="page-item">
            <a href="#" className="page-link" aria-label="Next">
              <span aria-hidden="true">&raquo;</span>
              <span class="sr-only">Next</span>
            </a>
          </li>
        </ul>
      </nav>
    );
  }
}

export default Pagination;
