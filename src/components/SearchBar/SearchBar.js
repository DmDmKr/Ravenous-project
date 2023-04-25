import React from 'react'
import './SearchBar.css'
import Yelp from '../../util/Yelp'

class SearchBar extends React.Component {
  constructor(props) {
    super(props)
    this.state = { term: '', location: '', sortBy: 'best_match', termValid: true, locationValid: true, suggestions: [] }
    this.sortByOptions = {
      'Best Match': 'best_match',
      'Highest Rated': 'rating',
      'Most Reviewed': 'review_count',
      Distance: 'distance'
    }
    this.handleTermChange = this.handleTermChange.bind(this)
    this.handleLocationChange = this.handleLocationChange.bind(this)
    this.handleSearch = this.handleSearch.bind(this)
    this.handleEnterKeyPress = this.handleEnterKeyPress.bind(this)
    this.renderSortByOptions = this.renderSortByOptions.bind(this)
    this.handleSuggestionClick = this.handleSuggestionClick.bind(this)
  }

  getSortByClass(sortByOption) {
    if (this.state.sortBy === sortByOption) {
      return 'active'
    } else {
      return ''
    }
  }

  handleSortByChange(sortByOption) {
    this.setState({ sortBy: sortByOption }, () => {
      this.props.searchYelp(this.state.term, this.state.location, this.state.sortBy)
    })
  }

  async handleTermChange(event) {
    const term = event.target.value.trim()
    this.setState({ term, termValid: term !== '' })

    if (term !== '') {
      const suggestions = await Yelp.autocomplete(term)
      //const suggestions = ['Japanese', 'Food', 'bakery', 'Polish', 'bowl']
      this.setState({ suggestions })
    }
  }

  handleLocationChange(event) {
    const location = event.target.value.trim()
    this.setState({ location, locationValid: location !== '' })
  }

  handleSearch(event) {
    const term = this.state.term.trim()
    const location = this.state.location.trim()
    if (term && location) {
      this.props.searchYelp(term, location, this.state.sortBy)
    } else {
      this.setState({
        termValid: term !== '',
        locationValid: location !== ''
      })
    }
    event.preventDefault()
  }

  handleSuggestionClick = (event, suggestion) => {
    event.preventDefault()
    const term = suggestion
    this.setState({ term, suggestions: [], termValid: term !== '' })
  }

  handleEnterKeyPress(event) {
    if (event.key === 'Enter') {
      this.handleSearch(event)
    }
  }

  renderSortByOptions() {
    return Object.keys(this.sortByOptions).map((sortByOption) => {
      let sortByOptionValue = this.sortByOptions[sortByOption]
      return (
        <li key={sortByOptionValue} className={this.getSortByClass(sortByOptionValue)} onClick={this.handleSortByChange.bind(this, sortByOptionValue)}>
          {sortByOption}
        </li>
      )
    })
  }

  render() {
    return (
      <div className="SearchBar">
        <div className="SearchBar-sort-options">
          <ul>{this.renderSortByOptions()}</ul>
        </div>
        <div className="SearchBar-fields">
          <div className="SearchBar-input-container">
            <input placeholder="Search Businesses" onChange={this.handleTermChange} onKeyDown={this.handleEnterKeyPress} value={this.state.term} className={this.state.termValid ? '' : 'error'} />
            {this.state.suggestions.length > 0 && (
              <ul className="SearchBar-suggestions">
                {this.state.suggestions.map((suggestion) => (
                  <li key={suggestion} onClick={(event) => this.handleSuggestionClick(event, suggestion)}>
                    {suggestion}
                  </li>
                ))}
              </ul>
            )}
          </div>
          <input placeholder="Where?" onChange={this.handleLocationChange} onKeyDown={this.handleEnterKeyPress} autoComplete="street-address" value={this.state.location} className={this.state.locationValid ? '' : 'error'} />
        </div>
        <div className="SearchBar-submit" onClick={this.handleSearch}>
          <a>Let's Go</a>
        </div>
      </div>
    )
  }
}

export default SearchBar
