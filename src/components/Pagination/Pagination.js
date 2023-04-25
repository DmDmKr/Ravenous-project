import React from 'react'
import './Pagination.css'

class Pagination extends React.Component {
  render() {
    // Calculate the number of pages based on the number of businesses and businesses per page
    const pageNumbers = []
    for (let i = 1; i <= Math.ceil(this.props.totalBusinesses / this.props.businessesPerPage); i++) {
      pageNumbers.push(i)
    }

    return (
      <div className="Pagination">
        {pageNumbers.map((number) => (
          <button key={number} onClick={() => this.props.onPageChange(number)}>
            {number}
          </button>
        ))}
      </div>
    )
  }
}

export default Pagination
