import React from 'react'
import './NoBusinessesShown.css'

class NoBusinessesShown extends React.Component {
  render() {
    let { error } = this.props
    if (!error) {
      error = 'Please search for some businesses!'
    }
    return (
      <div className="no-businesses-shown">
        <p>{error}</p>
        {/* add any other elements or styles you want here */}
      </div>
    )
  }
}

export default NoBusinessesShown
