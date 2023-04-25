import React from 'react'
import './Business.css'

class Business extends React.Component {
  handleImageClick = () => {
    window.open(this.props.business.url, '_blank')
  }

  render() {
    const { business } = this.props
    const addressString = `${business.address} ${business.city}, ${business.state} ${business.zipCode}`
    const googleMapsUrl = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(addressString)}`

    return (
      <div className="Business">
        <div className="image-container">
          <img src={this.props.business.imageSrc} alt="" onClick={this.handleImageClick} />
        </div>
        <h2>{this.props.business.name}</h2>
        <div className="Business-information">
          <div className="Business-address">
            <a href={googleMapsUrl} target="_blank">
              {business.address}
              <br />
              {business.city}, {business.state} {business.zipCode}
            </a>
          </div>
          <div className="Business-reviews">
            <h3>{this.props.business.category}</h3>
            <h3 className="rating">{this.props.business.rating} stars</h3>
            <p>{this.props.business.reviewCount} reviews</p>
          </div>
        </div>
      </div>
    )
  }
}

export default Business
