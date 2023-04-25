import React from 'react'
import './BusinessList.css'
import Business from '../Business/Business'

class BusinessList extends React.Component {
  render() {
    // Determine the index of the first and last businesses to display
    const indexOfLastBusiness = this.props.currentPage * this.props.businessesPerPage
    const indexOfFirstBusiness = indexOfLastBusiness - this.props.businessesPerPage

    // Slice the businesses array based on the index
    const businessesToDisplay = this.props.businesses.slice(indexOfFirstBusiness, indexOfLastBusiness)

    return (
      <div className="BusinessList">
        {businessesToDisplay.map((business) => {
          return <Business business={business} key={business.id} />
        })}
      </div>
    )
  }
}

export default BusinessList
