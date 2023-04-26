import React from 'react'
import BusinessList from '../BusinessList/BusinessList'
import SearchBar from '../SearchBar/SearchBar'
import './App.css'
import Yelp from '../../util/Yelp'
import NoBusinessesShown from '../NoBusinessesShown/NoBusinessesShown'
import Pagination from '../Pagination/Pagination'

class App extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      businesses: null,
      error: null,
      currentPage: 1,
      businessesPerPage: 8
    }
    this.searchYelp = this.searchYelp.bind(this)
    this.handlePageChange = this.handlePageChange.bind(this)
  }

  searchYelp(term, location, sortBy) {
    Yelp.search(term, location, sortBy)
      .then((businesses) => {
        if (businesses.length > 0) {
          this.setState({ businesses: businesses, error: null })
        } else {
          this.setState({ businesses: null, error: 'No businesses found.' })
        }
      })
      .catch((error) => {
        this.setState({ businesses: null, error: 'An error occurred while fetching data.' })
      })
  }

  handlePageChange = (pageNumber) => {
    this.setState({ currentPage: pageNumber })
  }

  render() {
    return (
      <div className="App">
        <h1>ravenous</h1>
        <SearchBar searchYelp={this.searchYelp} />
        {this.state.businesses && <Pagination totalBusinesses={this.state.businesses.length} businessesPerPage={this.state.businessesPerPage} onPageChange={this.handlePageChange} />}
        {this.state.businesses ? <BusinessList businesses={this.state.businesses} currentPage={this.state.currentPage} businessesPerPage={this.state.businessesPerPage} /> : <NoBusinessesShown error={this.state.error} />}
      </div>
    )
  }
}

export default App
