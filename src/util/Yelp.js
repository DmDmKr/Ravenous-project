const apiKey = 'JtcoWI56wA2H4lk3r6XcD7mmdaI-SwXyPIF6Unslt7rjCldKbL-XjFZ6Lvvx5jiQxhqWzwl0xxJY-KAyJT_-34SpvtlJWkAASJ5hA1uFTZDaFO-qdoGJvjxu-J42ZHYx'

const Yelp = {
  search(term, location, sortBy) {
    return fetch(`https://cors-anywhere.herokuapp.com/https://api.yelp.com/v3/businesses/search?term=${term}&location=${location}&sort_by=${sortBy}`, {
      headers: {
        Authorization: `Bearer ${apiKey}`
      }
    })
      .then((response) => {
        return response.json()
      })
      .then((jsonResponse) => {
        if (jsonResponse.businesses) {
          return jsonResponse.businesses.map((business) => ({
            id: business.id,
            url: business.url,
            imageSrc: business.image_url,
            name: business.name,
            address: business.location.address1,
            category: business.categories.map((category) => category.title).join(', '),
            city: business.location.city,
            state: business.location.state,
            zipCode: business.location.zip_code,
            reviewCount: business.review_count,
            rating: business.rating
          }))
        } else {
          throw new Error(jsonResponse.error.description)
        }
      })
      .catch((error) => {
        if (error.response && error.response.status === 429) {
          alert('You exceeded your search requests limit for today!')
        } else {
          alert(error.message)
        }
      })
  },

  async autocomplete(text) {
    try {
      const response = await fetch(`https://cors-anywhere.herokuapp.com/https://api.yelp.com/v3/autocomplete?text=${text}`, {
        headers: {
          Authorization: `Bearer ${apiKey}`
        }
      })
      const jsonResponse = await response.json()
      if (jsonResponse.terms) {
        const suggestions = jsonResponse.terms.map((term) => term.text)
        return suggestions
      }
    } catch (error) {
      alert(error.message)
      console.error(error)
      return []
    }
  }
}

export default Yelp
